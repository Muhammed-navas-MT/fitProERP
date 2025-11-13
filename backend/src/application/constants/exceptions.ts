export class ApplicationException extends Error {
    constructor(message:string){
        super(message);
    }
};


export class NOtFoundException extends ApplicationException {
    constructor(message:string) {
        super(message);
    }
};

export class AlreadyExistException extends ApplicationException {
    constructor(message:string){
        super(message);
    }
};

export class UpdateFailedException extends ApplicationException {
    constructor(message:string){
        super(message);
    }
};

export class InvalidIdException extends ApplicationException {
    constructor(message:string){
        super(message);
    }
};

export class InvalidDataException extends ApplicationException {
    constructor(message:string){
        super(message)
    }
}