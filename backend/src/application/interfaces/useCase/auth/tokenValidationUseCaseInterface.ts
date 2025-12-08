export interface IInTokenValidationUseCase {
    validate(token:string):Promise<void>;
}