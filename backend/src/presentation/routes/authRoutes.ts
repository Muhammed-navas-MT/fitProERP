import { NextFunction, Request, Response, Router } from "express";
import { ROUTES } from "../shared/constants/routes";
import { injectedRefreshTokenController } from "../../infrastructure/DI/auth/authInjection";

export class AuthRoutes {
    private _route:Router;
    constructor(){
        this._route = Router();
        this._setRoute();
    };

    private _setRoute(){
        this._route.post(ROUTES.REFRESH,(req:Request,res:Response,next:NextFunction)=>{
            injectedRefreshTokenController.refresh(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}