import { NextFunction, Request, Response, Router } from "express";
import { ROUTES } from "../shared/constants/routes";
import { injectedMemberLoginController } from "../../infrastructure/DI/member/memberInjection";

export class MemberRoutes {
    private _route:Router;
    constructor(){
        this._route = Router();
        this._setRoute();
    };

    private _setRoute(){
        this._route.post(ROUTES.MEMBER.LOGIN,(req:Request,res:Response,next:NextFunction)=>{
            injectedMemberLoginController.login(req,res,next);
        })
    };

    public get_routes():Router{
        return this._route;
    }
}