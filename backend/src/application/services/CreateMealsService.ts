import { AppDataSource } from "../../infrastructure/database/DataSource";
import Proteins from "../../domain/entities/Proteins";
import Meals from "../../domain/entities/Meals";

interface CreateMealsInterface {
  protein1: Proteins;
  protein2: Proteins;
  day_of_week: string;
  meal_type: string;
  description: string;
  sides: string;
  salads: string;
  desserts: string;
}

export default class CreateMealsService {
  async execute({
    protein1,
    protein2,
    day_of_week,
    meal_type,
    description,
    sides,
    salads,
    desserts,
  }: CreateMealsInterface) {
    const repository = AppDataSource.getRepository(Meals);
    const mealValidator = await repository
      .createQueryBuilder("meals")
      .where("CAST(meals.day_of_week AS DATE) = :day_of_week", {
        day_of_week: day_of_week.slice(0, 10),
      })
      .andWhere("LOWER(meals.meal_type) = :meal_type", {
        meal_type: meal_type.toLowerCase(),
      })
      .getOne();

    if (mealValidator instanceof Meals) {
      return new Error("Meal type already registered for the selected date.");
    }

    try {
      const newMeal = repository.create({
        protein1,
        protein2,
        day_of_week,
        meal_type,
        description,
        sides,
        salads,
        desserts,
      });
      await repository.save(newMeal);

      return newMeal;
    } catch (error) {
      console.error(error);
      return new Error("An error occurred while saving the meal.");
    }
  }
}
