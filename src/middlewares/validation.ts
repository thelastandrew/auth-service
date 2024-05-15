import { body } from 'express-validator';
import {
  MAX_USERNAME_LENGTH,
  MIN_USERNAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  passwordLengthErrorMessage,
  passwordRequiredErrorMessage,
  usernameLengthErrorMessage,
  usernameRequiredErrorMessage,
} from '../constants';

const lengthValidation = (min: number, max?: number) => ({ min, max });
const usernameLength = lengthValidation(MIN_USERNAME_LENGTH, MAX_USERNAME_LENGTH);
const passwordLength = lengthValidation(MIN_PASSWORD_LENGTH);


export const requiredBodyUsernameValidation = body('username')
  .notEmpty()
  .withMessage(usernameRequiredErrorMessage)
  .isLength(usernameLength)
  .withMessage(usernameLengthErrorMessage);

export const requiredBodyPasswordValidation = body('password')
  .notEmpty()
  .withMessage(passwordRequiredErrorMessage)
  .isLength(passwordLength)
  .withMessage(passwordLengthErrorMessage);
