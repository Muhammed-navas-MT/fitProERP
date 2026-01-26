export const attendanceMessage = {
  MARKED_SUCCESS: "Attendance marked successfully",
  UPDATED_SUCCESS: "Attendance updated successfully",
  FETCH_SUCCESS: "Attendance fetched successfully",
  FETCH_ALL_SUCCESS: "Attendance list fetched successfully",

  ALREADY_MARKED: "Attendance already marked for today",
  NOT_FOUND: "Attendance not found",
  INVALID_DATE: "Invalid attendance date",
  INVALID_USER: "Invalid user",
  UNAUTHORIZED: "You are not authorized to perform this action",
  FORBIDDEN: "Access denied",
  INVALID_STATUS: "Invalid attendance status",
  BRANCH_MISMATCH: "User does not belong to this branch",
  OUTSIDE_TRAINER_WORKING_HOURS: "Check-in outside trainer working hours",

  USER_ID_REQUIRED: "User ID is required",
  DATE_REQUIRED: "Date is required",
  STATUS_REQUIRED: "Attendance status is required",
  CHECK_OUT_BEFORE_CHECK_IN: "Check-out time must be after check-in time",
  CHECK_OUT_AFTER_DUTY_TIME: "Check-out outside trainer working hours",
  MEMBER_LOGOUT_BEFORE_ONE_HOUR:"Member can logout only after completing one hour",
  ALREADY_CHECKED_OUT: "Attendance already checked out",
  CHECK_OUT_BEFORE_DUTY_END:"Checkout before the duty time",

  INTERNAL_ERROR: "Something went wrong while processing attendance",
} as const;
