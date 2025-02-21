import cpfIsValid from "./src/cpfValidator";
import cnpjIsValid from "./src/cnpjValidator";
import getOnlyEmail from "./src/getOnlyEmail";
import isCEP from "./src/isCEP";
import isEmail from "./src/isEmail";
import validateEmail from "./src/validateEmail";
import validatePassword from "./src/validatePassword";
import validateUsername from "./src/validateUsername";
import isCreditCardValid from "./src/isCreditCardValid";
import identifyFlagCard from "./src/identifyFlagCard";
import isMACAddress from "./src/isMACAddress";
import isAscii from "./src/isAscii";
import isBase64 from "./src/isBase64";
import isDate from "./src/isDate";
import isDecimal from "./src/isDecimal";
import isEmpty from "./src/isEmpty";
import isMD5 from "./src/isMD5";
import validatePassportNumber from "./src/validatePassportNumber";
import isPort from "./src/isPort";
import isPostalCode from "./src/isPostalCode";
import isTime from "./src/isTime";
import validateBRPhoneNumber from "./src/validateBRPhoneNumber";
import validateUSPhoneNumber from "./src/validateUSPhoneNumber";
import validatePhoneNumber from "./src/validatePhoneNumber";
import isNumber from "./src/isNumber";
import passwordStrengthTester from "./src/passwordStrengthTester";
import validateSurname from "./src/validateSurname";
import validateName from "./src/validateName";
import validateTextarea from "./src/validateTextarea";
import isValidImage from "./src/isValidImage";
import isValidAudio from "./src/isValidAudio";
import isValidPdf from "./src/isValidPdf";
import isValidVideo from "./src/isValidVideo";
import isValidTxt from "./src/isValidTxt";
import type { ValidateFunctions, IsValidFunctions } from "./src/types";
import type {
  PasswordStrengthTesterOptions,
  PasswordStrengthFunction,
  PasswordStrengthType,
} from "./src/passwordStrengthTester";

export {
  cpfIsValid,
  cnpjIsValid,
  isEmail,
  validateEmail,
  isCEP,
  validateUsername,
  validatePassword,
  getOnlyEmail,
  isCreditCardValid,
  identifyFlagCard,
  isMACAddress,
  isAscii,
  isBase64,
  isDate,
  isDecimal,
  isEmpty,
  isMD5,
  isPort,
  isPostalCode,
  isTime,
  validatePassportNumber,
  validateBRPhoneNumber,
  validateUSPhoneNumber,
  validatePhoneNumber,
  isNumber,
  passwordStrengthTester,
  validateName,
  validateSurname,
  validateTextarea,
  isValidImage,
  isValidAudio,
  isValidPdf,
  isValidVideo,
  isValidTxt,
};

export default {
  cpfIsValid,
  cnpjIsValid,
  isEmail,
  validateEmail,
  isCEP,
  validateUsername,
  validatePassword,
  getOnlyEmail,
  isCreditCardValid,
  identifyFlagCard,
  isMACAddress,
  isAscii,
  isBase64,
  isDate,
  isDecimal,
  isEmpty,
  isMD5,
  isPort,
  isPostalCode,
  isTime,
  validatePassportNumber,
  validateBRPhoneNumber,
  validateUSPhoneNumber,
  validatePhoneNumber,
  isNumber,
  passwordStrengthTester,
  validateName,
  validateSurname,
  validateTextarea,
  isValidImage,
  isValidAudio,
  isValidPdf,
  isValidVideo,
  isValidTxt,
};

export type {
  ValidateFunctions,
  IsValidFunctions,
  PasswordStrengthTesterOptions,
  PasswordStrengthFunction,
  PasswordStrengthType,
};
