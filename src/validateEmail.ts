import { ValidateFunctions } from "./types";
import isEmail from "./isEmail";

const defaultErrorMsg: string[] = [
	"Email cannot be empty",
	"This e-mail is not valid",
	"Email too big, try again",
	"This email is not valid in the country",
	"Email domain is not allowed.",
];

const validDomainsDefault: string[] = [
	"@gmail.com",
	"@outlook.com",
	"@yahoo.com",
	"@icloud.com",
	"@hotmail.com",
	"@mail.ru",
	"@yandex.ru",
	"@gmx.com",
	"@zoho.com",
	"@protonmail.com",
	"@protonmail.ch",
];

interface OptionsParams {
	maxLength?: number;
	country?: string;
	errorMsg?: (string | null)[];
	validDomains?: boolean | string[];
}

const defaultOptionsParams: OptionsParams = {
	maxLength: undefined,
	country: "",
	errorMsg: defaultErrorMsg,
	validDomains: false,
};

/**
 * @param email
 * @param maxLength optional
 * @param country optional
 * @param errorMsg optional
 * @param validDomains optional
 * @default maxLength number: 400, validDomains = false
 * @example validateEmail('foor@bar.com', { maxLength: 30, country: "us" });
 * @example validateEmail('foor@bar.com', { maxLength: 30 });
 * @example validateEmail('foor@bar.com', { maxLength: 30, errorMsg: ['My own error message'] }); Country is set to null
 * @example validateEmail('joao@myOwnDomain.com', { validDomains: ['@myOwnDomain.com'] });
 * @example validateEmail('joaoaoao@gmail.com.com', { validDomains: true } );
 * @description This function returns six errors in the following order,
 *
 * If you want to use a default parameter, use null.
 *
 * Default:
 * ['Email cannot be empty', 'This e-mail is not valid', 'Email cannot be greater than ${maxEmailLength} characters', 'This email is not valid in the country','Email domain is not allowed.']
 *
 * Create a list of errors separated by commas in strings
 *
 * @description You can also pass a list of domains that will be allowed, if you leave the parameter empty, it will be set to false and no check will be performed, you can also pass only true and the following list will be used by default:
 *
 * Default:
 * ['@gmail.com', '@outlook.com', '@yahoo.com', '@icloud.com', '@hotmail.com',
  '@mail.ru', '@yandex.ru', '@gmx.com', '@zoho.com', '@protonmail.com', '@protonmail.ch'];

 * You can also create a custom list, your list will completely replace the default list.

	DOCUMENTATION: https://gabriel-logan.github.io/multiform-validator/srcPage/subPages/functions/validateEmail

 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateEmail(
	email: string,
	{
		maxLength,
		country,
		errorMsg,
		validDomains,
	}: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
	if (typeof email !== "string") {
		throw new TypeError("The input should be a string.");
	}

	// Expressão regular para verificar se o e-mail termina com um dos domínios válidos
	let regex: RegExp = /(?:)/; // Inicialização com uma expressão regular vazia

	if (Array.isArray(validDomains) && validDomains.length > 0) {
		const validDomainsCustom: string[] = validDomains.map((domain: string) =>
			domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
		);
		regex = new RegExp(`${validDomainsCustom.join("|")}$`, "i");
	} else if (validDomains) {
		regex = new RegExp(`${validDomainsDefault.join("|")}$`, "i");
	}

	// Check para saber se as mensagens que sao passadas sao validas
	// caso contrario retorna um ERRO
	if (errorMsg) {
		if (!Array.isArray(errorMsg))
			throw new Error("errorMsg must be an Array or null");
		for (let index: number = 0; index < errorMsg.length; index += 1) {
			if (errorMsg[index] != null && typeof errorMsg[index] !== "string") {
				throw new TypeError(
					"All values within the array must be strings or null/undefined.",
				);
			}
		}
	}

	if (maxLength || maxLength === 0) {
		if (maxLength < 1 || typeof maxLength !== "number") {
			throw new Error("maxLength must be a number and cannot be less than 1");
		}
	}

	const maxEmailLength: number = maxLength || 400;

	// Função interna para obter a mensagem de erro
	function getErrorMessage(index: number): string {
		const errorMessage: string | null = errorMsg
			? errorMsg[index]
			: defaultErrorMsg[index];
		if (errorMessage === "Email too big, try again") {
			return `Email cannot be greater than ${maxEmailLength} characters`;
		}
		return errorMessage != null ? errorMessage : defaultErrorMsg[index];
	}

	if (!email) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(0),
		};
	}

	// Check domain only if regex is defined (validDomains is true or validDomains is an array)
	if (!regex.test(email)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(4),
		};
	}
	if (!isEmail(email)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(1),
		};
	}
	if (email.length > maxEmailLength) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(2),
		};
	}
	// If country is provided, check if the email ends with the country code
	if (country) {
		if (!email.endsWith(`.${country}`)) {
			return {
				isValid: false,
				errorMsg: getErrorMessage(3),
			};
		}
	}
	return {
		isValid: true,
		errorMsg: null,
	};
}
export default validateEmail;
