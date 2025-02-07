import type { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
  "Phone number cannot be empty",
  "Invalid phone number",
];
/**
 * @param phoneNumber
 * @param errorMsg optional
 * @example validatePhoneNumber('555-123-4567');
 * @example validatePhoneNumber('(555) 123-4567', [null, 'Custom error 2']);
 * @default {errorMsg} ['Phone number cannot be empty', 'Invalid phone number']
 * @description This function is a generic phone number validator. It can validate phone numbers in various formats depending on the specific implementation.
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validatePhoneNumber(
  phoneNumber: string,
  errorMsg: (string | null)[] | null = defaultErrorMsg,
): ValidateFunctions {
  if (typeof phoneNumber !== "string") {
    throw new TypeError("The input should be a string.");
  }
  // Check to see if the passed error messages are valid; otherwise, return an error
  if (errorMsg) {
    if (!Array.isArray(errorMsg))
      throw new Error("errorMsg must be an Array or null");
    for (const element of errorMsg) {
      if (element != null && typeof element !== "string") {
        throw new TypeError(
          "All values within the array must be strings or null/undefined.",
        );
      }
    }
  }

  // Internal function to get the error message
  function getErrorMessage(index: number): string {
    const errorMessage: string | null = errorMsg ? errorMsg[index] : null;
    return errorMessage ?? defaultErrorMsg[index];
  }

  if (!phoneNumber) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(0),
    };
  }

  // Add specific phone number validation logic here for different countries/formats
  // For the generic implementation, we'll use a dummy regex that matches any string.
  // Updated regular expression for phone number validation

  const phoneNumberRegex: RegExp = /^\(\d{3}\) \d{3}-\d{4}$/;
  if (!phoneNumberRegex.test(phoneNumber)) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(1),
    };
  }
  return {
    isValid: true,
    errorMsg: null,
  };
}
export default validatePhoneNumber;
