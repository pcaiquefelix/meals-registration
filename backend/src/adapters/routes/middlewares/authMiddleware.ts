import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface TokenPayLoad {
  password: number;
  iat: number;
  exp: number;
}

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.sendStatus(401);
  }

  const token = authorization.replace("Bearer", "").trim();

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error("JWT_SECRET not defined in environment variables");
    }
    const data = jwt.verify(token, secret);
    const { password } = data as TokenPayLoad;
    req.userId = password;

    return next();
  } catch (error) {
    return res.sendStatus(401);
  }
}
