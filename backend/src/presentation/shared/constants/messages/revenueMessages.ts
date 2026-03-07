export enum RevenueError {
  NOT_FOUND = "Revenue record not found",
  INVALID_ID = "Invalid revenue id",
  ID_REQUIRED = "Revenue id is required",

  GYM_NOT_FOUND = "Gym not found",
  BRANCH_NOT_FOUND = "Branch not found",
  MEMBER_NOT_FOUND = "Member not found",

  INVALID_AMOUNT = "Invalid revenue amount",
  INVALID_CURRENCY = "Invalid currency",
  INVALID_PAYMENT_METHOD = "Invalid payment method",

  SOURCE_TYPE_REQUIRED = "Revenue source type is required",
  INVALID_SOURCE_TYPE = "Invalid revenue source type",

  SESSION_ID_REQUIRED = "Stripe session id is required",
  INVALID_SESSION = "Invalid Stripe session",

  CREATION_FAILED = "Failed to create revenue record",
  UPDATE_FAILED = "Failed to update revenue record",

  LIST_FAILED = "Unable to retrieve revenue list",
  DETAIL_FAILED = "Unable to retrieve revenue details",

  ALREADY_PROCESSED = "Revenue already processed",
}

export enum RevenueSuccess {
  CREATED = "Revenue record created successfully",
  UPDATED = "Revenue record updated successfully",
  LISTED = "Revenue list retrieved successfully",
  FOUND = "Revenue details retrieved successfully",

  CASH_RECORDED = "Cash revenue recorded successfully",
  ONLINE_SUCCESS = "Online revenue completed successfully",
}
