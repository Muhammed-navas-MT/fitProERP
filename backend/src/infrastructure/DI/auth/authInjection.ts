import { RefreshTokenUseCase } from "../../../application/useCases/auth/refreshTokenUseCase";
import { RefreshTokenController } from "../../../presentation/controller/authController/auth";
import { JwtService } from "../../services/jwtService";

const jwtService = new JwtService()
const refreshTokenUseCase = new RefreshTokenUseCase(jwtService)
export const injectedRefreshTokenController  = new RefreshTokenController(refreshTokenUseCase)