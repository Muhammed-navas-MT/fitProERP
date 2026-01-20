import morgan from "morgan";
import { Express, Request, Response } from "express";
import path from "path";
import { configEnv } from "../../config/envConfig";
import { createRotatingFileStream } from "../shared/utils/rfs";

export function accessAndErrorLoggerMiddleware(app: Express) {
  if (configEnv.NODE_ENV === "DEVELOPMENT") {
    app.use(morgan("combined"));
  } else {
    const accessLogStream = createRotatingFileStream(
      "1d",
      7,
      path.join(process.cwd(), "logs", "accessLogs")
    );
    const errorLogStream = createRotatingFileStream(
      "1d",
      7,
      path.join(process.cwd(), "logs", "errorLogs")
    );

    app.use(morgan("combined", { stream: accessLogStream }));

    app.use(
      morgan("combined", {
        stream: errorLogStream,
        skip: (req: Request, res: Response) => res.statusCode < 400,
      })
    );
  }
}