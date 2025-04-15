import { AppDataSource } from "../../infrastructure/database/DataSource";
import Proteins from "../../domain/entities/Proteins";
import Meals from "../../domain/entities/Meals";

interface UpdateMealsInterface {
  id: number;
  protein1: Proteins;
  protein2: Proteins;
  day_of_week: Date;
  meal_type: string;
  description: string;
  sides: string;
  salads: string;
  desserts: string;
  updated_at: Date;
}

export default class UpdateMealsService {
  async execute({
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
  }: UpdateMealsInterface) {
    const repository = AppDataSource.getRepository(Meals);
    const meal = await repository.findOne({ where: { id } });
    if (!meal) {
      return new Error("Meal does not exist.");
    }
    try {
      return await repository.update(id, {
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
    } catch (error) {
      return new Error("An error occurred.");
    }
  }
}
