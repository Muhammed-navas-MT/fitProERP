import { configEnv } from "../../../config/envConfig";
import { Error } from "../../../presentation/shared/constants/errorMessage/Error";
import { TokenMissingException } from "../../constants/exceptions";
import { ICacheService } from "../../interfaces/service/cacheServiceInterface";
import { IJwtService } from "../../interfaces/service/jwtServiceInterface";
import { ITokenValidationUseCase } from "../../interfaces/useCase/auth/tokenValidationUseCaseInterface";

export class TokenValidationUseCase implements ITokenValidationUseCase {
    private _jwtService:IJwtService;
    private _cacheService:ICacheService
    constructor(jwtService:IJwtService,cacheService:ICacheService){
        this._cacheService = cacheService;
        this._jwtService = jwtService
    }
    async validate(token: string): Promise<void> {
        const decode = await this._jwtService.verifyRefreshToken(token);
        if(!decode){
            throw new TokenMissingException(Error.TOKEN_INVALID);
        };

        await this._cacheService.setData(`blackList${token}`,"blackList",604800);
    }
}