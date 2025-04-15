import "reflect-metadata";
import "./infrastructure/database/DataSource";

import express, { Request, Response, NextFunction } from "express";
import routes from "./adapters/routes/routes";
import dotenv from "dotenv";
import { CorsOptions } from "cors";
const cors = require("cors");

dotenv.config({ path: "./.env" });
const app = express();

const allowedOrigins = ["http://localhost:3000"];
// Middleware to set `req.headers.origin` based on `X-Custom-Origin`
const customOriginMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.origin && req.headers["x-custom-origin"]) {
    req.headers.origin = req.headers["x-custom-origin"] as string;
    console.log("Using X-Custom-Origin:", req.headers.origin);
  }
  next();
};

// CORS options
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    console.log("Received origin:", origin);

    if (
      origin &&
      allowedOrigins.some((allowed) => allowed.startsWith(origin))
    ) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(express.json());
app.use(customOriginMiddleware);
app.use(cors(corsOptions));
app.use(routes);

app.listen(5001, () => console.log("The Server is Running."));
