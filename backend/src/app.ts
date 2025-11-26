import dotenv from 'dotenv';
dotenv.config();
import { configEnv } from './config/envConfig';
import { MongodbConfig } from "./config/mongoConfig";
import express, { Express, Router} from "express";
import { SuperAdminRoutes } from "./presentation/routes/superAdminRoutes";
import { ROUTES } from "./presentation/shared/constants/routes";
import {errorHandleMiddleware} from "./presentation/middlewares/errorHandlingMiddleware"
import { GymAdminRoutes } from './presentation/routes/gymAdminRoutes';
import { TrainerRoutes } from './presentation/routes/trainerRoutes';
import cors from "cors";
import cookieParser from "cookie-parser";

class Express_app {
    private _app:Express;
    constructor(){
        this._app = express();
        MongodbConfig.connect();
        this.setMiddleware();
        this._setSuperAdminRoutes();
        this._setGymAdminRoutes();
        this._setTrainerRoutes();
        this._setErrorHandleMiddleware();
    };

    setMiddleware(){
        this._app.use(express.json());
        this._app.use(express.urlencoded({extended:true}))
        this._app.use(cors(
            {
                origin:"http://localhost:5173",
                credentials:true
            })
        )
        this._app.use(cookieParser());
    };


    private _setSuperAdminRoutes(){
        console.log("sldflasdjflkasjdf")
        const superAdminRoutes = new SuperAdminRoutes();
        this._app.use(ROUTES.AUTH.SUPERADMIN.BASE,superAdminRoutes.get_routes())
    };

    private _setGymAdminRoutes(){
        const gymAdminRoutes = new GymAdminRoutes();
        this._app.use(ROUTES.GYMADMIN.BASE,gymAdminRoutes.get_routes());
    };

    private _setTrainerRoutes(){
        const trainerRoutes = new TrainerRoutes();
        this._app.use(ROUTES.TRAINER.BASE,trainerRoutes.get_routes());
    }

    private _setErrorHandleMiddleware(){
        this._app.use(errorHandleMiddleware)
    }

    listen(){
        this._app.listen(Number(configEnv.PORT),()=>console.log("server is Running...."));
    }
};

const _app = new Express_app();
_app.listen();