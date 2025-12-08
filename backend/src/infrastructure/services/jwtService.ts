import { sign, SignOptions, verify } from "jsonwebtoken";
import { IJwtService } from "../../application/interfaces/service/jwtServiceInterface";
import { JWTPayloadType } from "../../domain/type/jwtPayload";
import { configEnv } from "../../config/envConfig";
import { TokenExpiredException, TokenMissingException } from "../../application/constants/exceptions";
import { Error } from "../../presentation/shared/constants/errorMessage/Error";

export class JwtService implements IJwtService {
    createAccessToken(payload: JWTPayloadType): string {
        try {
            const secretKey = configEnv.JWT_SECRET;
        if(!secretKey){
            throw new TokenMissingException(Error.ACCESS_TOKEN_SECRETKEY_MISSING);
        }
        const expiresInDuration =configEnv.ACCESS_TOKEN_EXPIRATION_TIME
        return sign(payload, secretKey, { expiresIn:expiresInDuration }as SignOptions);
        } catch (error) {
            throw new TokenExpiredException(Error.TOKEN_EXPIRED)
        }
    };

    createRefreshTken(payload: JWTPayloadType): string {
        try {
            const secretKey = configEnv.REFRESH_TOKEN_SECRECT_KEY;
        if(!secretKey){
            throw new TokenMissingException(Error.REFRESH_TOKEN_SECRETKEY_MISSING);
        }
        const expiresInDuration =configEnv.REFRESH_TOKEN_EXPIRATION_TIME
        return sign(payload, secretKey, { expiresIn:expiresInDuration }as SignOptions);
        } catch (error) {
            throw new TokenExpiredException(Error.TOKEN_EXPIRED)
        }
    };

    verifyAccessToken(token: string): JWTPayloadType | null {
        try {
            const secretKey = configEnv.JWT_SECRET;
            if(!secretKey){
                throw new TokenMissingException(Error.ACCESS_TOKEN_SECRETKEY_MISSING);
            }
            const {id,role} = verify(
                token,
                secretKey,
            )as JWTPayloadType;
            if(!(id && role)){
                throw new TokenExpiredException(Error.TOKEN_INVALID)
            }
            return {id,role};
        } catch (error) {
            void error
            throw new TokenExpiredException(Error.TOKEN_EXPIRED)
        }
    };

    verifyRefreshToken(token: string): JWTPayloadType | null {
        try {
            const secretKey = configEnv.REFRESH_TOKEN_SECRECT_KEY
            if(!secretKey){
                throw new TokenMissingException(Error.REFRESH_TOKEN_SECRETKEY_MISSING);
            }
            const {id,role} = verify(
                token,
                secretKey
            )as JWTPayloadType;
            if(!(id && role)){
                throw new TokenExpiredException(Error.TOKEN_INVALID);
            };
            return {id,role};
        }catch (error) {
            throw new TokenExpiredException(Error.REFRESH_TOKEN_EXPIRED);
        }          
    }
}