export const ProgressError = {
  NOT_FOUND: "Progress not found",
  MEMBER_NOT_FOUND: "Member not found",
  INVALID_MEMBER_HEIGHT: "Invalid member height data",
  ALREADY_EXISTS: "Progress already exists for this date",
  INVALID_DATA: "Invalid progress data",
  FAILED_TO_CREATE: "Failed to create progress",
  FAILED_TO_UPDATE: "Failed to update progress",
  FAILED_TO_DELETE: "Failed to delete progress",
  FAILED_TO_FETCH: "Failed to fetch progress",
  INVALID_WEIGHT: "Valid weight is required",
  INVALID_WEIGHT_VALUE: "Weight must be greater than 0",
  INVALID_WEIGHT_UNIT: "Weight unit must be kg or lbs",

  INVALID_BODY_FAT: "Body fat percentage must be between 0 and 100",

  INVALID_MUSCLE_MASS: "Muscle mass must be greater than 0",
  INVALID_MUSCLE_MASS_UNIT: "Muscle mass unit must be kg or lbs",

  INVALID_NOTE: "Note must not exceed 500 characters",
};

export enum ProgressSuccess {
  CREATED = "Progress added successfully",
  UPDATED = "Progress updated successfully",
  DELETED = "Progress deleted successfully",
  FETCHED = "Progress fetched successfully",
  LIST_FETCHED = "Progress list fetched successfully",
}
