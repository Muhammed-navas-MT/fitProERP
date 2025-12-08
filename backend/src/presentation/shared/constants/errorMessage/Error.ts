export enum Error {
    ENV_REDIS_URL_ERROR = "Error while redis server url in environment variables",
    REDIS_CONNECTED_ERROR = "Error while connecting to redis client",
    ACCESS_TOKEN_SECRETKEY_MISSING = "JWT secret key is not configured",
    REFRESH_TOKEN_SECRETKEY_MISSING = "Refresh token secret key is not configured",
    TOKEN_GENERATION_FAILED = "Failed to generate access token",
    REFRESH_TOKEN_GENERATION_FAILED = "Failed to generate refresh token",
    TOKEN_MISSING = "Access token is missing",
    TOKEN_INVALID = "Invalid access token",
    TOKEN_EXPIRED = "Access token has expired",
    REFRESH_TOKEN_MISSING = "Refresh token is missing",
    REFRESH_TOKEN_INVALID = "Invalid refresh token",
    REFRESH_TOKEN_EXPIRED = "Refresh token has expired",
}