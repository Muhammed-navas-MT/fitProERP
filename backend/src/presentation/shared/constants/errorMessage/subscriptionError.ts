import { Durations } from "../../../../domain/enums/duration";
export enum SubscriptionError {
    PLAN_NAME_INVALID_TYPE = "Plan name must be a string",
    PLAN_NAME_TOO_LONG = "Plan name must not execed 50 characters",
    PLAN_NAME_TOO_SHORT = "Plan name must be at least 3 characters long",
    PLAN_NAME_INVALID_CHARACTERS = "Plan name contains invalid characters",
    PLAN_NAME_ALREADY_EXISTS = "A subscription plan with this name already exists",

    PRICE_INVALID_TYPE = "Price must be a number",
    PRICE_TOO_SHORT = "Price must be at least (9999) above",
    PRICE_NEGATIVE = "Price cannot be negative",

    DURATION_INVALID = `Invalid duration. Must be ${Durations.ONE_MONTH}, ${Durations.ONE_YEAR} or ${Durations.TREE_MONTHS}`,

    FEATURES_INVALID_TYPE = "Features must be an array",
    FEATURE_INVALID_TYPE = "Each feature must be a string",
    FEATURE_DUPLICATE = "Duplicate features are not allowed",
    FEATURE_EMPTY = "At least one feature is required",

    IS_ACTIVE_INVALID_TYPE = "isActive must be a boolean value",

    VALIDATION_FAILED = "Validation failed",
    SUBSCRIPTION_NOT_FOUND = "Subscription not found",
    SUBSCRIPTION_AlREADY_EXIST = "This subscription already exist",
    SUBSCRIPTION_UPDATE_FAILED = "Failed to update subscription",
    SUBSCRIPTION_DELETE_FAILED = "Failed to delete subscription",
    UNAUTHORIZED_ACCESS = "Unauthorized to access this subscription",
    INVALID_SUBSCRIPTION_ID = "Invalid subscription ID",

    SUBSCRIPTION_CREATED = "Subscription created successfully",
    SUBSCRIPTION_UPDATED = "Subscription updated successfully",
    SUBSCRIPTION_FOUND = "Subscription fetched successfully",
    SUBSCRIPTION_LIST = "Subscription listed successfully",
    SUBSCRIPTION_INACTIVE = "Subscription plan is inactive"

}