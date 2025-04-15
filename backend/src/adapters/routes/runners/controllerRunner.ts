import { Request, Response, NextFunction } from "express";
import {
  Controllers,
  ControllersGetDiffer,
  UserControllerInterface,
} from "../../../../@types/controllers";

type Construtor<T> = new () => T;

export default function controllerRunner<
  T extends Controllers | ControllersGetDiffer | UserControllerInterface
>(
  ControllerClass: Construtor<T>,
  methodName: keyof T
): (req: Request, res: Response, next: NextFunction) => Promise<void> {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const controller = new ControllerClass(); // Instantiate the controller
      const method = controller[methodName]; // Retrieve the method dynamically

      if (typeof method !== "function") {
        throw new Error(
          `Method ${String(methodName)} not found in the controller.`
        );
      }

      await method.call(controller, req, res); // Call the method in the correct context
    } catch (err) {
      next(err); // Pass the error to the Express error middleware
    }
  };
}
