import "reflect-metadata";
import "dotenv/config";
import "@/shared/container";
import upload from "@/config/upload";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";
import { routes } from "./routes";
import { AppError } from "@/shared/errors/AppError";
import createConnection from "@/shared/infra/typeorm";

import swaggerFile from "@/swagger.json";

createConnection();

const app = express();

app.use(express.json());

app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`,
    });
});

export { app };
