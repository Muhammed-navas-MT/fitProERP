import { IJwtService } from "../../interfaces/service/jwtServiceInterface";
import { IRefreshTokenUseCase } from "../../interfaces/useCase/auth/refreshTokenUseCaseInterface";
import { Error } from "../../../presentation/shared/constants/errorMessage/Error";
import { TokenExpiredException } from "../../constants/exceptions";

export class RefreshTokenUseCase implements IRefreshTokenUseCase {
    private _jwtService:IJwtService
    constructor(jwtService:IJwtService){
        this._jwtService = jwtService
    }
    async refresh(token: string): Promise<string> {
        const decoded = this._jwtService.verifyAccessToken(token);

        if(!decoded){
            throw new TokenExpiredException(Error.REFRESH_TOKEN_INVALID);
        };
        const accessToken = this._jwtService.createAccessToken({id:decoded.id,role:decoded.role});
        return accessToken
    }
}