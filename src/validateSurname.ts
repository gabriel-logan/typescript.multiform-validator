import { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
	"Surname cannot be empty",
	"Surname cannot contain numbers",
	"Surname cannot contain special characters",
	"This surname is not valid",
	"Surname too big, try again",
];

interface OptionsParams {
	minLength?: number;
	maxLength?: number;
	errorMsg?: (string | null)[];
}

const defaultOptionsParams: OptionsParams = {
	minLength: undefined,
	maxLength: undefined,
	errorMsg: defaultErrorMsg,
};

/**
 * @param surname
 * @param minLength
 * @param maxLength
 * @param errorMsg
 * @default minLength number: default: 1
 * @default maxLength number: default: 25
 * @example validateSurname('Jackson', { minLength: 3, maxLength: 25 });
 * @info minLength cannot be greater than maxLength
 * @description This function returns 6 errors in the following order,
 *
 * default:
 *
 * [
  'Surname cannot be empty',
  'Surname cannot contain numbers',
  'Surname cannot contain special characters',
  'This surname is not valid',
  'Surname too big, try again',
];
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateSurname(
	surname: string,
	{ minLength, maxLength, errorMsg }: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
	if (typeof surname !== "string") {
		throw new TypeError("The input should be a string.");
	}

	// Check para saber se as mensagens que sao passadas sao validas
	// caso contrario retorna um ERRO

	if (errorMsg) {
		if (!Array.isArray(errorMsg)) {
			throw new Error("errorMsg must be an Array or null");
		}
		for (let index: number = 0; index < errorMsg.length; index += 1) {
			if (errorMsg[index] != null && typeof errorMsg[index] !== "string") {
				throw new TypeError(
					"All values within the array must be strings or null/undefined.",
				);
			}
		}
	}

	// Função interna para obter a mensagem de erro
	function getErrorMessage(index: number): string {
		const errorMessage: string | null = errorMsg ? errorMsg[index] : null;
		return errorMessage != null ? errorMessage : defaultErrorMsg[index];
	}

	const minNameLength: number = minLength || 1;
	const maxNameLength: number = maxLength || 25;

	if (
		maxNameLength < 1 ||
		minNameLength < 1 ||
		typeof minNameLength !== "number" ||
		typeof maxNameLength !== "number"
	) {
		throw new Error(
			"maxLength or minLength must be a number and cannot be less than 1",
		);
	}

	if (minNameLength > maxNameLength) {
		throw new Error("minLength cannot be greater than maxLength");
	}

	if (!surname) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(0),
		};
	}

	if (surname.length > maxNameLength) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(4),
		};
	}
	if (surname.length < minNameLength) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(3),
		};
	}

	if (surname.match(/\d/)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(1),
		};
	}

	if (surname.match(/[^\w\s]/)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(2),
		};
	}

	// Check if all characters in the surname are repeated
	if (new Set(surname).size === 1) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(3), // Assuming 'Surname is not allowed.' refers to all characters being repeated.
		};
	}

	// Check if the surname contains at least 3 consecutive characters that are the same
	const consecutiveCharsRegex: RegExp = /(\w)\1\1/;
	if (consecutiveCharsRegex.test(surname)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(3), // You can set the appropriate error message for this case.
		};
	}

	return {
		isValid: true,
		errorMsg: null,
	};
}
export default validateSurname;
