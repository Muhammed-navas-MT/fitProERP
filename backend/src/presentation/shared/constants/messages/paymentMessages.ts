export enum PaymentError {
  NOT_FOUND = "Payment not found",
  INVALID_ID = "Invalid payment id",
  ID_REQUIRED = "Payment id is required",

  GYM_NOT_FOUND = "Gym not found",
  PACKAGE_NOT_FOUND = "Package not found",

  INVALID_AMOUNT = "Invalid payment amount",
  INVALID_CURRENCY = "Invalid currency",
  INVALID_PAYMENT_METHOD = "Invalid payment method",

  SESSION_ID_REQUIRED = "Stripe session id is required",
  INVALID_SESSION = "Invalid Stripe session",

  PAYMENT_FAILED = "Payment failed",
  PAYMENT_NOT_SUCCESS = "Payment is not successful",

  ALREADY_PROCESSED = "Payment already processed",
  REFUND_NOT_ALLOWED = "Refund not allowed for this payment",

  CREATION_FAILED = "Failed to create payment",
  UPDATE_FAILED = "Failed to update payment",

  LIST_FAILED = "Unable to retrieve payment list",
  DETAIL_FAILED = "Unable to retrieve payment details",
}


export enum PaymentSuccess {
  CREATED = "Payment created successfully",
  UPDATED = "Payment updated successfully",
  LISTED = "Payment list retrieved successfully",
  FOUND = "Payment details retrieved successfully",

  SUCCESS = "Payment completed successfully",
  FAILED = "Payment marked as failed",

  REFUNDED = "Payment refunded successfully",
}