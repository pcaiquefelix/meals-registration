import { Router } from "express";
import UsersController from "../controllers/UsersController";
import MealsController from "../controllers/MealsController";
import ProteinsController from "../controllers/ProteinsController";
import controllerRunner from "./runners/controllerRunner";
import authMiddleware from "./middlewares/authMiddleware";
import middlewareRunner from "./runners/middlewareRunner";

const routes = Router();

routes.post(
  "/authentication",
  controllerRunner(UsersController, "authentication")
);
routes.post(
  "/users",
  middlewareRunner(authMiddleware),
  controllerRunner(UsersController, "create")
);
routes.post(
  "/proteins",
  middlewareRunner(authMiddleware),
  controllerRunner(ProteinsController, "create")
);
routes.post(
  "/meals",
  middlewareRunner(authMiddleware),
  controllerRunner(MealsController, "create")
);

routes.get(
  "/proteins",
  middlewareRunner(authMiddleware),
  controllerRunner(ProteinsController, "get")
);
routes.get(
  "/week-meals/:date",
  controllerRunner(MealsController, "getWeekMeals")
);
routes.get(
  "/meals-date-range",
  controllerRunner(MealsController, "getMealsByDateRange")
);
routes.get(
  "/meals",
  middlewareRunner(authMiddleware),
  controllerRunner(MealsController, "getAll")
);
routes.get(
  "/meals/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(MealsController, "getOne")
);
routes.get(
  "/users",
  middlewareRunner(authMiddleware),
  controllerRunner(UsersController, "getAll")
);
routes.get(
  "/users/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(UsersController, "getOne")
);
routes.get(
  "/users-index",
  middlewareRunner(authMiddleware),
  controllerRunner(UsersController, "getIndex")
);

routes.put(
  "/proteins/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(ProteinsController, "update")
);
routes.put(
  "/meals/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(MealsController, "update")
);
routes.put(
  "/users/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(UsersController, "update")
);

routes.delete(
  "/proteins/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(ProteinsController, "delete")
);
routes.delete(
  "/meals/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(MealsController, "delete")
);
routes.delete(
  "/users/:id",
  middlewareRunner(authMiddleware),
  controllerRunner(UsersController, "delete")
);

export default routes;
