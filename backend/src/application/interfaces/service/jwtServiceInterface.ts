import { JWTPayloadType } from "../../../domain/type/jwtPayload";

export interface IJwtService {
    createAccessToken(payload:JWTPayloadType):string;
    createRefreshTken(payload:JWTPayloadType):string;
    verifyAccessToken(token:string):JWTPayloadType | null;
    verifyRefreshToken(token:string):JWTPayloadType | null;
    decode(token:string):JWTPayloadType | null;
}