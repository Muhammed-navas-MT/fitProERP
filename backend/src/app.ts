import dotenv from 'dotenv';
dotenv.config();
import { configEnv } from './config/envConfig';
import { MongodbConfig } from "./config/mongoConfig";
import express, { Express,Response,Request } from "express";
import { SuperAdminRoutes } from "./presentation/routes/superAdminRoutes";
import { ROUTES } from "./presentation/shared/constants/routes";
// import { env } from "process";
import {errorHandleMiddleware} from "./presentation/middlewares/errorHandlingMiddleware"



class Express_app {
    private _app:Express;
    constructor(){
        this._app = express();
        MongodbConfig.connect();
        this.setMiddleware();
        this._setSuperAdminRoutes();
        this._setErrorHandleMiddleware();
    };

    setMiddleware(){
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended:true}))
    };

    private _setSuperAdminRoutes(){
        const superAdminRoutes = new SuperAdminRoutes();
        this._app.use(ROUTES.AUTH.SUPERADMIN.BASE,superAdminRoutes.get_routes())
    };

    private _setErrorHandleMiddleware(){
        this._app.use(errorHandleMiddleware)
    }

    listen(){
        this._app.listen(Number(process.env.PORT),()=>console.log("server is Running...."));
    }
};

const _app = new Express_app();
_app.listen();