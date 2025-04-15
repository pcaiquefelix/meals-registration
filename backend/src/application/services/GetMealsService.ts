import { AppDataSource } from "../../infrastructure/database/DataSource";
import Meals from "../../domain/entities/Meals";

export default class GetMealsService {
  async oneMealExecute(id: number) {
    const repository = AppDataSource.getRepository(Meals);
    const meals = await repository.findOne({
      where: { id },
      relations: ["protein1", "protein2"],
    });
    return meals;
  }

  async allMealsExecute() {
    const repository = AppDataSource.getRepository(Meals);
    const meals = await repository.find({
      relations: ["protein1", "protein2"],
    });
    return meals;
  }

  async allWeekMealsExecute(date: Date) {
    const repository = AppDataSource.getRepository(Meals);
    const startWeekDate = new Date(date);
    const endWeekDate = new Date(date);

    while (startWeekDate.getDay() > 0) {
      startWeekDate.setDate(startWeekDate.getDate() - 1);
    }
    while (endWeekDate.getDay() < 6) {
      endWeekDate.setDate(endWeekDate.getDate() + 1);
    }

    const meals = await repository
      .createQueryBuilder("meal")
      .where("CAST(meal.day_of_week AS DATE) BETWEEN :start AND :end", {
        start: startWeekDate.toISOString().slice(0, 10),
        end: endWeekDate.toISOString().slice(0, 10),
      })
      .getMany();

    return meals;
  }

  async mealsByDateRangeExecute(startDate: Date, endDate: Date) {
    const repository = AppDataSource.getRepository(Meals);
    const meals = await repository
      .createQueryBuilder("meals")
      .where("meals.day_of_week BETWEEN :startDate AND :endDate", {
        startDate,
        endDate,
      })
      // .orderBy("meals.day_of_week", "ASC") // Order by date
      .getMany();
    return meals;
  }
}
