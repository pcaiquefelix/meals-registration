import { Request, Response, NextFunction } from "express";

type Middleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => void | Response<any, Record<string, any>>;

export default function middlewareRunner(
  middleware: Middleware
): (req: Request, res: Response, next: NextFunction) => void {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      if (typeof middleware !== "function") {
        throw new Error(
          `Method ${String(middleware)} not found in the controller.`
        );
      }

      middleware(req, res, next);
    } catch (err) {
      next(err); // Pass the error to the Express error middleware
    }
  };
}
