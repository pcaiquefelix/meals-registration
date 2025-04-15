import { validate } from "class-validator";
import Proteins from "../../domain/entities/Proteins";
import { AppDataSource } from "../../infrastructure/database/DataSource";

export default class CreateProteinService {
  async execute(name: string, monthly_incidence: number) {
    const repository = AppDataSource.getRepository(Proteins);
    if (await repository.findOne({ where: { name: name.toLowerCase() } })) {
      return new Error("Protein already exists");
    }
    const newProtein = repository.create({ name, monthly_incidence });

    try {
      const errors = await validate(newProtein);
      if (errors.length > 0) {
        return errors;
      }
    } catch (error) {
      return new Error("Validation error for the field monthly_incidence");
    }

    try {
      await repository.save(newProtein);
      return newProtein;
    } catch (error) {
      return new Error("An error occurred");
    }
  }
}
