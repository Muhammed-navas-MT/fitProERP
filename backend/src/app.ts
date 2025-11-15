import dotenv from 'dotenv';
dotenv.config();
import { configEnv } from './config/envConfig';
import { MongodbConfig } from "./config/mongoConfig";
import express, { Express} from "express";
import { SuperAdminRoutes } from "./presentation/routes/superAdminRoutes";
import { ROUTES } from "./presentation/shared/constants/routes";
import {errorHandleMiddleware} from "./presentation/middlewares/errorHandlingMiddleware"
import { GymAdminRoutes } from './presentation/routes/gymAdminRoutes';



class Express_app {
    private _app:Express;
    constructor(){
        this._app = express();
        MongodbConfig.connect();
        this.setMiddleware();
        this._setSuperAdminRoutes();
        this._setGymAdminRoutes();
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

    private _setGymAdminRoutes(){
        const gymAdminRoutes = new GymAdminRoutes();
        this._app.use(ROUTES.GYMADMIN.BASE,gymAdminRoutes.get_routes());
    }

    private _setErrorHandleMiddleware(){
        this._app.use(errorHandleMiddleware)
    }

    listen(){
        this._app.listen(Number(process.env.PORT),()=>console.log("server is Running...."));
    }
};

const _app = new Express_app();
_app.listen();