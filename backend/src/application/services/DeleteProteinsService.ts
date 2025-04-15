import { AppDataSource } from "../../infrastructure/database/DataSource";
import Proteins from "../../domain/entities/Proteins";

export default class DeleteProteinsService {
  async execute(id: number) {
    const repository = AppDataSource.getRepository(Proteins);
    if (!(await repository.findOne({ where: { id } }))) {
      return new Error("Protein does not exist.");
    }
    return await repository.delete(id);
  }
}
