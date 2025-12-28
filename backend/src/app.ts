import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { configEnv } from "./config/envConfig";
import { MongodbConfig } from "./config/mongoConfig";
import express, { Express, Router } from "express";
import { SuperAdminRoutes } from "./presentation/routes/superAdminRoutes";
import { ROUTES } from "./presentation/shared/constants/routes";
import { errorHandleMiddleware } from "./presentation/middlewares/errorHandlingMiddleware";
import { GymAdminRoutes } from "./presentation/routes/gymAdminRoutes";
import { TrainerRoutes } from "./presentation/routes/trainerRoutes";
import cookieParser from "cookie-parser";

class Express_app {
  private _app: Express;
  constructor() {
    this._app = express();
    MongodbConfig.connect();
    this.setMiddleware();
    this._setSuperAdminRoutes();
    this._setGymAdminRoutes();
    this._setTrainerRoutes();
    this._setErrorHandleMiddleware();
  }

  setMiddleware() {
    this._app.use(
      cors({
        origin: (origin, callback) => {
          if (!origin) return callback(null, true);
          const allowed = [
            /^https?:\/\/localhost(:\d+)?$/,
            /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
            /^https?:\/\/([a-zA-Z0-9-]+)\.localhost(:\d+)?$/,
          ];

          if (allowed.some((regex) => regex.test(origin))) {
            return callback(null, true);
          }
          return callback(new Error("CORS Not Allowed"));
        },
        credentials: true,
      })
    );
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
    this._app.use(cookieParser());
  }

  private _setSuperAdminRoutes() {
    const superAdminRoutes = new SuperAdminRoutes();
    this._app.use(ROUTES.AUTH.SUPERADMIN.BASE, superAdminRoutes.get_routes());
  }

  private _setGymAdminRoutes() {
    const gymAdminRoutes = new GymAdminRoutes();
    this._app.use(ROUTES.GYMADMIN.BASE, gymAdminRoutes.get_routes());
  }

  private _setTrainerRoutes() {
    const trainerRoutes = new TrainerRoutes();
    this._app.use(ROUTES.TRAINER.BASE, trainerRoutes.get_routes());
  }

  private _setErrorHandleMiddleware() {
    this._app.use(errorHandleMiddleware);
  }

  listen() {
    this._app.listen(Number(configEnv.PORT), () =>
      console.log(
        "server is Running....",
        `🔐 RoleGuard middleware
         ⛔ Block access if subscription expired
         📊 Subscription status endpoint`
      )
    );
  }
}

const _app = new Express_app();
_app.listen();
