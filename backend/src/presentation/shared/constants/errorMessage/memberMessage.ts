export enum MemberError {
  MEMBER_NOT_FOUND = "Member not found",
  MEMBER_ALREADY_EXISTS = "A member with this email already exists",
  UNAUTHORIZED_ACCESS = "You are not authorized to perform this action",
  INVALID_CREDENTIALS = "Invalid email or password",
  ACCOUNT_INACTIVE = "Your account is inactive. Please contact your gym administrator",
  ACCOUNT_BLOCKED = "Your account has been blocked. Please contact support",

  GYM_ID_INVALID = "Invalid gym ID format",
  GYM_NOT_FOUND = "Gym not found",
  GYM_NOT_ACTIVE = "This gym is currently inactive. Please contact support",
  BRANCH_ID_INVALID = "Invalid branch ID format",
  BRANCH_NOT_FOUND = "Branch not found",
  BRANCH_BLOCK = "Branch is Blocked",
  TRAINER_ID_INVALID = "Invalid trainer ID format",
  TRAINER_NOT_FOUND = "Trainer not found",
  TRAINER_NOT_AVAILABLE = "Selected trainer is not available",
  TRAINER_NOT_ACTIVE = "This trainer is currently inactive.",

  FIRST_NAME_INVALID_TYPE = "First name must be a string",
  FIRST_NAME_TOO_SHORT = "First name must be at least 2 characters long",
  FIRST_NAME_INVALID_CHARACTERS = "First name can only contain letters, spaces, and basic punctuation",

  EMAIL_INVALID_TYPE = "Email must be a string",
  EMAIL_INVALID_FORMAT = "Invalid email format",
  EMAIL_ALREADY_EXISTS = "A member with this email already exists",
  EMAIL_ALREADY_REGISTERED = "This email is already registered in the system",

  PHONE_INVALID_TYPE = "Phone number must be a string",
  PHONE_INVALID_FORMAT = "Invalid phone number format. Use format: +919876543210",
  PHONE_TOO_SHORT = "Phone number must be at least 10 digits",

  PASSWORD_INVALID_TYPE = "Password must be a string",
  PASSWORD_TOO_SHORT = "Password must be at least 8 characters long",
  PASSWORD_NO_UPPERCASE = "Password must contain at least one uppercase letter",
  PASSWORD_NO_LOWERCASE = "Password must contain at least one lowercase letter",
  PASSWORD_NO_NUMBER = "Password must contain at least one number",
  PASSWORD_NO_SPECIAL = "Password must contain at least one special character (@$!%*?&#)",
  PASSWORDS_DO_NOT_MATCH = "Password and confirm password do not match",
  OLD_PASSWORD_INCORRECT = "Current password is incorrect",

  PROFILE_IMG_INVALID_TYPE = "Profile image must be a string",
  PROFILE_IMG_INVALID_URL = "Profile image must be a valid URL",
  PROFILE_IMG_INVALID_FORMAT = "Profile image must be an image file (jpg, jpeg, png, webp)",
  PROFILE_IMG_REQUIRED = "Profile image is required",

  ADDRESS_INVALID_TYPE = "Address must be a string",
  ADDRESS_TOO_SHORT = "Address must be at least 10 characters long",

  EMERGENCY_NUMBER_INVALID_TYPE = "Emergency number must be a string",
  EMERGENCY_NUMBER_INVALID_FORMAT = "Invalid emergency number format. Use format: +919876543210",
  EMERGENCY_NUMBER_TOO_SHORT = "Emergency number must be at least 10 digits",
  EMERGENCY_NUMBER_SAME_AS_PHONE = "Emergency number cannot be the same as phone number",

  GENDER_INVALID_TYPE = "Gender must be a string",
  GENDER_INVALID = "Gender must be one of: male, female, other",

  DATE_OF_BIRTH_INVALID_TYPE = "Date of birth must be a valid date",
  DATE_OF_BIRTH_FUTURE = "Date of birth cannot be in the future",

  WEIGHT_VALUE_INVALID_TYPE = "Weight value must be a number",
  WEIGHT_VALUE_NEGATIVE = "Weight value cannot be negative",
  WEIGHT_VALUE_TOO_LOW = "Weight value must be at least 20",
  WEIGHT_VALUE_TOO_HIGH = "Weight value cannot exceed 500",
  WEIGHT_UNIT_INVALID = "Weight unit must be either 'kg' or 'lbs'",

  HEIGHT_VALUE_INVALID_TYPE = "Height value must be a number",
  HEIGHT_VALUE_NEGATIVE = "Height value cannot be negative",
  HEIGHT_VALUE_TOO_LOW = "Height value must be at least 50",
  HEIGHT_VALUE_TOO_HIGH = "Height value cannot exceed 300",
  HEIGHT_UNIT_INVALID = "Height unit must be either 'cm' or 'ft'",

  TARGET_WEIGHT_VALUE_INVALID_TYPE = "Target weight value must be a number",
  TARGET_WEIGHT_VALUE_NEGATIVE = "Target weight value cannot be negative",
  TARGET_WEIGHT_VALUE_TOO_LOW = "Target weight value must be at least 20",
  TARGET_WEIGHT_VALUE_TOO_HIGH = "Target weight value cannot exceed 500",
  TARGET_WEIGHT_UNIT_INVALID = "Target weight unit must be either 'kg' or 'lbs'",

  BLOOD_GROUP_INVALID_TYPE = "Blood group must be a string",
  BLOOD_GROUP_INVALID = "Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-",

  MEDICAL_CONDITIONS_INVALID_TYPE = "Medical conditions must be a string",

  ALLERGIES_INVALID_TYPE = "Allergies must be a string",

  FITNESS_GOAL_INVALID_TYPE = "Fitness goal must be a string",
  FITNESS_GOAL_TOO_SHORT = "Fitness goal must be at least 3 characters long",

  PLAN_ID_INVALID = "Invalid plan ID format",
  PLAN_NOT_FOUND = "Selected plan not found",

  START_DATE_INVALID_TYPE = "Start date must be a valid date",
  START_DATE_PAST = "Start date cannot be in the past",
  END_DATE_INVALID_TYPE = "End date must be a valid date",
  END_DATE_BEFORE_START = "End date must be after start date",
  PACKAGE_DURATION_TOO_SHORT = "Package duration must be at least 1 day",

  PRICE_INVALID_TYPE = "Price must be a number",
  PRICE_NEGATIVE = "Price cannot be negative",
  PRICE_TOO_LOW = "Price must be at least ₹100",

  PAYMENT_STATUS_INVALID = "Invalid payment status",

  CREATION_FAILED = "Failed to create member account",
  UPDATE_FAILED = "Failed to update member information",
  BLOCK_FAILED = "Failed to delete member",
  FETCH_FAILED = "Failed to fetch member information",
  LIST_FETCH_FAILED = "Failed to fetch members list",
  VALIDATION_FAILED = "Validation failed. Please check all fields",

  PACKAGE_EXPIRED = "Member's package has expired",

  INVALID_OTP = "OTP is invalid",
  MEMBER_BLOCKED = "Your account is Blocked"

}

export enum MemberSuccess {
  MEMBER_CREATED = "Member account created successfully",
  MEMBER_UPDATED = "Member information updated successfully",
  MEMBER_ACTIVATED = "Member account activated successfully",
  MEMBER_DEACTIVATED = "Member account deactivated successfully",

  PROFILE_UPDATED = "Profile updated successfully",
  PROFILE_PICTURE_UPDATED = "Profile picture updated successfully",
  PROFILE_PICTURE_DELETED = "Profile picture deleted",
  PASSWORD_CHANGED = "Password changed successfully",
  PASSWORD_RESET = "Password reset successfully",

  MEMBER_FETCHED = "Member details retrieved successfully",
  MEMBERS_LISTED = "Members list retrieved successfully",
  MEMBER_SEARCH_SUCCESS = "Member search completed successfully",

  HEALTH_DETAILS_UPDATED = "Health details updated successfully",
  WEIGHT_UPDATED = "Weight updated successfully",
  FITNESS_GOAL_UPDATED = "Fitness goal updated successfully",

  PACKAGE_ASSIGNED = "Package assigned successfully",
  PACKAGE_UPDATED = "Package updated successfully",

  PAYMENT_PROCESSED = "Payment processed successfully",

  EMAIL_VERIFIED = "Email verified successfully",

  OTP_SENT = "OTP sent successfully",
  OTP_VERIFIED = "OTP verified successfully",

  PASSWORD_SENT = "Password sent Successfully",
  PASSWORD_SENT_MESSAGE = "Please log in and change your password immediately for security.",
  
  REGISTRATION_SUCCESS = "Account created successfully! You can now log in",
  LOGIN_SUCCESS = "Account login successfully",
  LOGOUT_SUCCESS = "Account logout successfully",
}