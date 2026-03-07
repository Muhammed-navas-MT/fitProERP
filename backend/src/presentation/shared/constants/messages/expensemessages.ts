export enum ExpenseError {
  NOT_FOUND = "Expense record not found",
  INVALID_ID = "Invalid expense id",
  ID_REQUIRED = "Expense id is required",

  GYM_NOT_FOUND = "Gym not found",
  BRANCH_NOT_FOUND = "Branch not found",

  INVALID_AMOUNT = "Invalid expense amount",
  INVALID_PAYMENT_METHOD = "Invalid payment method",
  INVALID_EXPENSE_TYPE = "Invalid expense type",

  DESCRIPTION_REQUIRED = "Expense description is required",

  PAYMENT_DATE_REQUIRED = "Payment date is required",
  INVALID_PAYMENT_DATE = "Invalid payment date",

  CREATION_FAILED = "Failed to create expense record",
  UPDATE_FAILED = "Failed to update expense record",

  LIST_FAILED = "Unable to retrieve expense list",
  DETAIL_FAILED = "Unable to retrieve expense details",

  ALREADY_PROCESSED = "Expense already processed",

  INVALID_BRANCH = "Invalid branch",
  INVALID_CREATOR = "Invalid creator",
}

export enum ExpenseSuccess {
  CREATED = "Expense record created successfully",
  UPDATED = "Expense record updated successfully",

  LISTED = "Expense list retrieved successfully",
  FOUND = "Expense details retrieved successfully",

  DELETED = "Expense record deleted successfully",

  PAYMENT_RECORDED = "Expense payment recorded successfully",
}
