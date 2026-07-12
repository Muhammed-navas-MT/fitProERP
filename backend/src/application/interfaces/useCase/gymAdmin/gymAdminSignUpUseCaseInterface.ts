import { IDocumentRequsetDTO } from "../../../dtos/auth/gymAdminSignupDto";

export interface ISingupUseCase {
  signUp(data: IDocumentRequsetDTO): Promise<void>;
}
