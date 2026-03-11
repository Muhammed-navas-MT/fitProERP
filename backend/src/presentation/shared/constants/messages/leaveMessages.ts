export enum LeaveError {
  NOT_FOUND = "Leave request not found",
  INVALID_ID = "Invalid leave id",
  ID_REQUIRED = "Leave id is required",

  TRAINER_NOT_FOUND = "Trainer not found",
  GYM_NOT_FOUND = "Gym not found",

  START_DATE_REQUIRED = "Start date is required",
  END_DATE_REQUIRED = "End date is required",

  INVALID_DATE_RANGE = "Start date must be before end date",
  PAST_DATE_NOT_ALLOWED = "Leave cannot be applied for past dates",

  REASON_REQUIRED = "Leave reason is required",

  OVERLAPPING_LEAVE = "Leave already exists for selected dates",

  ALREADY_APPROVED = "Leave is already approved",
  ALREADY_REJECTED = "Leave is already rejected",

  REJECTION_REASON_REQUIRED = "Rejection reason is required",

  CREATION_FAILED = "Failed to create leave request",
  APPROVAL_FAILED = "Failed to approve leave",
  REJECTION_FAILED = "Failed to reject leave",

  LIST_FAILED = "Unable to retrieve leave list",
  DETAIL_FAILED = "Unable to retrieve leave details",
  TRAINER_ID_REQUIRED = "Trainer id is required",
}

export enum LeaveSuccess {
  CREATED = "Leave request submitted successfully",
  UPDATED = "Leave update request submitted successfully",
  APPROVED = "Leave approved successfully",
  REJECTED = "Leave rejected successfully",

  FOUND = "Leave details retrieved successfully",
  LISTED = "Leave list retrieved successfully",
}
