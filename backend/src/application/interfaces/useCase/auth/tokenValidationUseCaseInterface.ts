export interface ITokenInValidationUseCase {
    validate(token:string):Promise<void>;
}