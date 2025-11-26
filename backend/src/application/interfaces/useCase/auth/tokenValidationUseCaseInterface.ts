export interface ITokenValidationUseCase {
    validate(token:string):Promise<void>;
}