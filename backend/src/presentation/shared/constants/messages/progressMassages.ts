export enum ProgressError {
  NOT_FOUND = "Progress not found",
  MEMBER_NOT_FOUND = "Member not found",
  INVALID_MEMBER_HEIGHT = "Invalid member height data",
  ALREADY_EXISTS = "Progress already exists for this date",
  INVALID_DATA = "Invalid progress data",
  FAILED_TO_CREATE = "Failed to create progress",
  FAILED_TO_UPDATE = "Failed to update progress",
  FAILED_TO_DELETE = "Failed to delete progress",
  FAILED_TO_FETCH = "Failed to fetch progress",
}

export enum ProgressSuccess {
  CREATED = "Progress added successfully",
  UPDATED = "Progress updated successfully",
  DELETED = "Progress deleted successfully",
  FETCHED = "Progress fetched successfully",
  LIST_FETCHED = "Progress list fetched successfully",
}
