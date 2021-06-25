import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import { router } from "./routes";
import cors from "cors";
import "./database";
import { CustomError } from "./errors/CustomError"

const app = express();
app.use(cors());

app.use(express.json());

app.use(router);

app.use((err: CustomError, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        return response.status(err.statusCode || 400).json({
            error: err.message
        })
    };

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    });
})

app.listen(3000, () => console.log("🔥 Server is running"));
