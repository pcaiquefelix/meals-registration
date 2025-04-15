import { AppDataSource } from "../../infrastructure/database/DataSource";
import Meals from "../../domain/entities/Meals";

export default class DeleteMealsService {
  async execute(id: number) {
    const repository = AppDataSource.getRepository(Meals);
    if (!(await repository.findOne({ where: { id } }))) {
      return new Error("Meal does not exist.");
    }
    return await repository.delete(id);
  }
}
