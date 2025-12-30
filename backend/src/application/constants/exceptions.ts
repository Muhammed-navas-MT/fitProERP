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
};

export class OtpExpiredException extends ApplicationException {
    constructor(message:string){
        super(message);
    }
}

export class InvalidOtpException extends ApplicationException {
    constructor(message:string){
        super(message);
    }
}

export class ForbiddenException extends ApplicationException {
    constructor(message:string){
        super(message);
    }
};

export class TokenMissingException extends ApplicationException {
    constructor(message:string){
        super(message);
    }
}

export class TokenExpiredException extends ApplicationException {
    public role?: string;
    public subdomain?: string;

    constructor(message: string, role?: string, subdomain?: string) {
        super(message);
        this.role = role;
        this.subdomain = subdomain;
        this.name = "TokenExpiredException";
    }
}