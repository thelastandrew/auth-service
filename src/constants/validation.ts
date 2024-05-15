export const MIN_USERNAME_LENGTH = 2;
export const MAX_USERNAME_LENGTH = 15;
export const MIN_PASSWORD_LENGTH = 8;
export const MAX_PASSWORD_LENGTH = 30;

export const usernameRequiredErrorMessage = '"username" property is required';
export const usernameLengthErrorMessage
  = `Username length must be from ${MIN_USERNAME_LENGTH} to ${MAX_USERNAME_LENGTH} characters`;

export const passwordRequiredErrorMessage = '"password" property is required';
export const passwordLengthErrorMessage
  = `Password length must be from ${MIN_PASSWORD_LENGTH} to ${MAX_PASSWORD_LENGTH} characters`;