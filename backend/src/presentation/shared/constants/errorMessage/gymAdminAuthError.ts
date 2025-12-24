export enum GymAdminAuthError {
    EMAIL_DATA_MISSING_IN_CACHE = "Email data is missing from cache",
    INVALID_OTP = "OTP is invalid",

  GYM_NAME_INVALID_TYPE = "Gym name must be a string",
  GYM_NAME_TOO_SHORT = "Gym name must be at least 3 characters long",
  GYM_NAME_TOO_LONG = "Gym name must not exceed 100 characters",
  GYM_NAME_INVALID_CHARACTERS = "Gym name contains invalid characters",
  GYM_NAME_ALREADY_EXISTS = "A gym with this name already exists",

  OWNER_NAME_INVALID_TYPE = "Owner name must be a string",
  OWNER_NAME_TOO_SHORT = "Owner name must be at least 2 characters long",
  OWNER_NAME_TOO_LONG = "Owner name must not exceed 50 characters",
  OWNER_NAME_INVALID_CHARACTERS = "Owner name can only contain letters and spaces",

  EMAIL_INVALID_FORMAT = "Invalid email format",
  EMAIL_ALREADY_EXISTS = "An account with this email already exists",

  PHONE_INVALID_TYPE = "Phone number must be a string",
  PHONE_INVALID_FORMAT = "Invalid phone number format",
  PHONE_TOO_SHORT = "Phone number must be at least 10 digits",

  PASSWORD_INVALID_TYPE = "Password must be a string",
  PASSWORD_TOO_SHORT = "Password must be at least 8 characters long",
  PASSWORD_TOO_LONG = "Password must not exceed 128 characters",
  PASSWORD_NO_UPPERCASE = "Password must contain at least one uppercase letter",
  PASSWORD_NO_LOWERCASE = "Password must contain at least one lowercase letter",
  PASSWORD_NO_NUMBER = "Password must contain at least one number",
  PASSWORD_NO_SPECIAL = "Password must contain at least one special character",
  PASSWORDS_DO_NOT_MATCH = "Passwords do not match",

  ROLE_INVALID = "Invalid role selected",

  DESCRIPTION_INVALID_TYPE = "Description must be a string",

  TAGLINE_INVALID_TYPE = "Tagline must be a string",

  BUSINESS_LICENSE_INVALID_TYPE = "Business license must be a string",
  BUSINESS_LICENSE_INVALID_URL = "Business license must be a valid URL",
  BUSINESS_LICENSE_INVALID_FORMAT = "Business license must be a PDF or image file",

  INSURANCE_CERTIFICATE_INVALID_TYPE = "Insurance certificate must be a string",
  INSURANCE_CERTIFICATE_INVALID_URL = "Insurance certificate must be a valid URL",
  INSURANCE_CERTIFICATE_INVALID_FORMAT = "Insurance certificate must be a PDF or image file",

  LOGO_INVALID_TYPE = "Logo must be a string",
  LOGO_INVALID_URL = "Logo must be a valid URL",
  LOGO_INVALID_FORMAT = "Logo must be an image file (jpg, jpeg, png, svg, webp)",

  VALIDATION_FAILED = "Validation failed",
  SIGNUP_FAILED = "Failed to create account",
  ACCOUNT_CREATION_FAILED = "Failed to create account. Please try again",
  VERIFICATION_EMAIL_FAILED = "Account created but failed to send verification email",

  GYM_NOT_FOUND = "Gym not found",
  GYM_NOT_ACTIVE = "This gym is currently inactive. Please take Subscrption",
  GYM_IS_PENDING = "Your gym account is currently pending approval. Please wait for admin verification",
  GYM_IS_REGECTED = "The gym registration has been rejected by the administrator.",
  GYM_STATUS_INVALID = "Status is invalid",
  UPDATE_STATUS_FAILD = "Status update Failed"
}