import { Request, Response } from "express";
import meals from "../../domain/entities/Meals";
import CreateRefeicoesService from "../../application/services/CreateMealsService";
import DeleteRefeicoesService from "../../application/services/DeleteMealsService";
import GetRefeicoesService from "../../application/services/GetMealsService";
import UpdateRefeicoesService from "../../application/services/UpdateMealsService";
import { ControllersGetDiffer } from "../../../@types/controllers";

export default class MealsController implements ControllersGetDiffer {
  async create(request: Request, response: Response) {
    const {
      protein1,
      protein2,
      meal_type,
      description,
      sides,
      salads,
      desserts,
    }: meals = request.body;
    const { day_of_week }: { day_of_week: string } = request.body;
    const createRefeicoesService = new CreateRefeicoesService();
    const result = await createRefeicoesService.execute({
      protein1,
      protein2,
      day_of_week,
      meal_type,
      description,
      sides,
      salads,
      desserts,
    });
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.status(200).json({ message: "Meal created successfully!" });
  }

  async getOne(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const getRefeicoesService = new GetRefeicoesService();
    const result = await getRefeicoesService.oneMealExecute(id);
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }

  async getAll(request: Request, response: Response) {
    const getRefeicoesService = new GetRefeicoesService();
    const result = await getRefeicoesService.allMealsExecute();
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }

  async getWeekMeals(request: Request, response: Response) {
    const { date } = request.params;
    const dateHandler = new Date(date);
    const getRefeicoesService = new GetRefeicoesService();
    const result = await getRefeicoesService.allWeekMealsExecute(dateHandler);
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }

  async getMealsByDateRange(request: Request, response: Response) {
    const { startDate, endDate } = request.query;
    if (!startDate || !endDate) {
      return response
        .status(400)
        .json("Start date and/or end date not provided.");
    }

    const start = new Date((startDate as string) + "T00:00");
    const end = new Date((endDate as string) + "T23:59:59.999Z");

    if (start > end) {
      return response
        .status(400)
        .json("The start date must be earlier than the end date.");
    }

    const getRefeicoesService = new GetRefeicoesService();
    const result = await getRefeicoesService.mealsByDateRangeExecute(
      start,
      end
    );
    if (result) {
      return response.json(result);
    }
  }

  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const {
      protein1,
      protein2,
      day_of_week,
      meal_type,
      description,
      sides,
      salads,
      desserts,
    }: meals = request.body;
    const updated_at = new Date();
    const updateRefeicoesService = new UpdateRefeicoesService();
    const result = await updateRefeicoesService.execute({
      id,
      protein1,
      protein2,
      day_of_week,
      meal_type,
      description,
      sides,
      salads,
      desserts,
      updated_at,
    });
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.status(200).json({ message: "Meal updated successfully!" });
  }

  async delete(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const deleteRefeicoesService = new DeleteRefeicoesService();
    const result = await deleteRefeicoesService.execute(id);
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.status(200).json({ message: "Meal deleted successfully!" });
  }
}
