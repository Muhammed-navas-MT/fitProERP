export enum TrainerError {
  TRAINER_NOT_FOUND = "Trainer not found",
  TRAINER_ALREADY_EXISTS = "A trainer with this email already exists",
  UNAUTHORIZED_ACCESS = "You are not authorized to perform this action",
  INVALID_CREDENTIALS = "Invalid email or password",
  VALIDATION_FAILED = "Validation failed. Please check all fields",

  ACCOUNT_INACTIVE = "Your account is inactive. Please contact your gym administrator",
  ACCOUNT_BLOCKED = "Your account has been blocked. Please contact support",
  TRAINER_IS_PENDING = "Your account is currently pending approval. Please wait for admin verification",

  ID_INVALID = "Invalid ID format",
  GYM_ID_INVALID = "Invalid gym ID format",
  GYM_NOT_FOUND = "Gym not found",

  BRANCH_ID_INVALID = "Invalid branch ID format",
  BRANCH_NOT_FOUND = "Branch not found",
  BRANCH_NOT_BELONG_TO_GYM = "This branch does not belong to the specified gym",
  BRANCH_BLOCK = " This branch is Blocked",

  NAME_INVALID_TYPE = "Trainer name must be a string",
  NAME_TOO_SHORT = "Trainer name must be at least 2 characters long",
  NAME_INVALID_CHARACTERS = "Trainer name can only contain letters, spaces, and basic punctuation",

  EMAIL_INVALID_TYPE = "Email must be a string",
  EMAIL_INVALID_FORMAT = "Invalid email format",
  EMAIL_ALREADY_EXISTS = "A trainer with this email already exists",
  EMAIL_ALREADY_REGISTERED = "This email is already registered in the system",
  EMAIL_DATA_MISSING_IN_CACHE = "Email data is missing from cache",

  PHONE_INVALID_TYPE = "Phone number must be a string",
  PHONE_INVALID_FORMAT = "Invalid phone number format. Use format: +919876543210",
  PHONE_TOO_SHORT = "Phone number must be at least 10 digits",
  PHONE_ALREADY_EXISTS = "A trainer with this phone number already exists",

  PASSWORD_INVALID_TYPE = "Password must be a string",
  PASSWORD_TOO_SHORT = "Password must be at least 8 characters long",
  PASSWORD_NO_UPPERCASE = "Password must contain at least one uppercase letter",
  PASSWORD_NO_LOWERCASE = "Password must contain at least one lowercase letter",
  PASSWORD_NO_NUMBER = "Password must contain at least one number",
  PASSWORD_NO_SPECIAL = "Password must contain at least one special character (@$!%*?&#)",
  PASSWORDS_DO_NOT_MATCH = "Password and confirm password do not match",
  OLD_PASSWORD_INCORRECT = "Current password is incorrect",
  NEW_PASSWORD_SAME_AS_OLD = "New password must be different from the current password",

  ADDRESS_INVALID_TYPE = "Address must be a string",
  ADDRESS_TOO_SHORT = "Address must be at least 10 characters long",

  ROLE_INVALID = "Invalid trainer role",
  STATUS_INVALID = "Invalid trainer status",
  STATUS_TRANSITION_INVALID = "Cannot change status from blocked to active directly",

  SPECIALIZATION_INVALID_TYPE = "Specialization must be an array of strings",
  SPECIALIZATION_EMPTY = "Specialization array cannot be empty",
  SPECIALIZATION_ITEM_INVALID = "Each specialization must be a non-empty string",
  SPECIALIZATION_TOO_SHORT = "Each specialization must be at least 2 characters long",
  SPECIALIZATION_DUPLICATE = "Duplicate specializations are not allowed",

  EXPERIENCE_INVALID_TYPE = "Experience must be a number",
  EXPERIENCE_NEGATIVE = "Experience cannot be negative",
  EXPERIENCE_NOT_INTEGER = "Experience must be a whole number",

  BASE_SALARY_INVALID_TYPE = "Base salary must be a number",
  BASE_SALARY_NEGATIVE = "Base salary cannot be negative",
  BASE_SALARY_TOO_LOW = "Base salary must be at least ₹5,000",
  BASE_SALARY_NOT_INTEGER = "Base salary must be a whole number",

  COMMISSION_RATE_INVALID_TYPE = "Commission rate must be a number",
  COMMISSION_RATE_NEGATIVE = "Commission rate cannot be negative",
  COMMISSION_RATE_TOO_HIGH = "Commission rate cannot exceed 100%",
  COMMISSION_RATE_INVALID_DECIMAL = "Commission rate can have at most 2 decimal places",

  DUTY_TIME_INVALID_TYPE = "Duty time must be an object",
  DUTY_START_TIME_INVALID = "Invalid duty start time",
  DUTY_END_TIME_INVALID = "Invalid duty end time",
  TIME_FORMAT_INVALID = "Time must be in HH:MM format (e.g., 09:00)",
  DUTY_TIME_INVALID_RANGE = "End time must be after start time",

  INVALID_OTP = "OTP is invalid",

  PROFILE_PICTURE_INVALID_TYPE = "Profile picture must be an image file",
  PROFILE_PICTURE_TOO_LARGE = "Profile picture size must not exceed 5MB",
  PROFILE_PICTURE_UPLOAD_FAILED = "Failed to upload profile picture",

  CERTIFICATE_UPLOAD_FAILED = "Failed to upload certificate",
  CERTIFICATE_INVALID_FORMAT = "Certificate must be a PDF or image file",

  CREATION_FAILED = "Failed to create trainer account",
  UPDATE_FAILED = "Failed to update trainer information",
  DELETE_FAILED = "Failed to delete trainer",
  FETCH_FAILED = "Failed to fetch trainer information",
  LIST_FETCH_FAILED = "Failed to fetch trainers list",

  TRAINER_HAS_ACTIVE_SESSIONS = "Cannot delete trainer with active training sessions",
  TRAINER_HAS_ACTIVE_CLIENTS = "Cannot deactivate trainer with active client assignments",

  GYM_NOT_ACTIVE = "This gym is currently inactive. Please contact support",
  ONE_TRAINER_REQUIRED = "At least one active trainer is required",
}


export enum TrainerSuccess {
  TRAINER_CREATED = "Trainer account created successfully",
  TRAINER_UPDATED = "Trainer information updated successfully",
  TRAINER_ACTIVATED = "Trainer account activated successfully",
  TRAINER_DEACTIVATED = "Trainer account deactivated successfully",


  PROFILE_UPDATED = "Profile updated successfully",
  PROFILE_PICTURE_UPDATED = "Profile picture updated successfully",
  PASSWORD_CHANGED = "Password changed successfully",
  PASSWORD_RESET = "Password reset successfully",

  TRAINER_FETCHED = "Trainer details retrieved successfully",
  TRAINERS_LISTED = "Trainers list retrieved successfully",
  TRAINER_SEARCH_SUCCESS = "Trainer search completed successfully",

  SPECIALIZATION_ADDED = "Specialization added successfully",
  SPECIALIZATION_REMOVED = "Specialization removed successfully",
  SPECIALIZATION_UPDATED = "Specializations updated successfully",

  DUTY_TIME_UPDATED = "Duty time updated successfully",
  SCHEDULE_CREATED = "Training schedule created successfully",
  SCHEDULE_UPDATED = "Training schedule updated successfully",

  SALARY_UPDATED = "Salary details updated successfully",
  COMMISSION_RATE_UPDATED = "Commission rate updated successfully",
  PAYMENT_PROCESSED = "Payment processed successfully",

  EMAIL_VERIFIED = "Email verified successfully",
  ACCOUNT_VERIFIED = "Account verified successfully",
  CERTIFICATE_VERIFIED = "Certificate verified successfully",
  CERTIFICATE_UPLOADED = "Certificate uploaded successfully",

  REGISTRATION_SEND_OTP = "OTP for Registration in compass",
  OTP_SUCCESSFULL = "Otp sent successfully",
  OTP_VERIFIED_SUCCESSFULL= "Otp verified successfully",
  REGISTRATION_SUCCESS = "Account created successfully! You can now log in",
  LOGIN_SUCCESS = "Account login successfully",
  LOGOUT_SUCCESS = "Account logout successfully"

}