export enum SessionError {
  NOT_FOUND = "Session not found",
  INVALID_DATA = "Invalid session data",
  ID_REQUIRED = "Session id is required",
  INVALID_ID = "Invalid session id",

  MEMBER_REQUIRED = "Member id is required",
  TRAINER_REQUIRED = "Trainer id is required",
  SLOT_REQUIRED = "Slot id is required",

  DATE_REQUIRED = "Session date is required",
  INVALID_DATE = "Invalid session date",

  START_TIME_REQUIRED = "Start time is required",
  END_TIME_REQUIRED = "End time is required",
  INVALID_TIME = "Time must be in HH:MM format",
  INVALID_TIME_RANGE = "Hour must be 00–23 and minute must be 00–59",

  END_TIME_GREATER = "End time must be greater than start time",

  ALREADY_BOOKED = "This slot is already booked",
  SLOT_NOT_AVAILABLE = "Selected slot is not available",

  INVALID_STATUS = "Invalid session status",
  STATUS_UPDATE_FAILED = "Failed to update session status",

  FEEDBACK_REQUIRED = "Feedback is required",
  INVALID_FEEDBACK = "Invalid feedback",

  CREATION_FAILED = "Failed to create session",
  UPDATE_FAILED = "Failed to update session",
  DELETE_FAILED = "Failed to delete session",
  CANNOT_COMPLETE_BEFORE_END_TIME = "Session cannot be marked as completed before end time",
  COMPLETED_SESSION_CANNOT_CANCELLED = "Completed session cannot be cancelled",
  ALREADY_CANCELLED = "Session already cancelled",
  CANCELLED_3_HOURS_BEFORE = "Session can only be cancelled at least 3 hours before start time",
}

export enum SessionSuccess {
  CREATED = "Session created successfully",
  UPDATED = "Session updated successfully",
  DELETED = "Session deleted successfully",

  LISTED = "Session list retrieved successfully",
  FOUND = "Session details retrieved successfully",

  STATUS_UPDATED = "Session status updated successfully",
  MARKED_COMPLETED = "Session marked as completed",
  CANCELLED = "Session cancelled successfully",

  FEEDBACK_ADDED = "Feedback added successfully",
}
