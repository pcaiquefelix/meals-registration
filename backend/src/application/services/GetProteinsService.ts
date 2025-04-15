import { AppDataSource } from "../../infrastructure/database/DataSource";
import Proteins from "../../domain/entities/Proteins";

export default class GetProteinsService {
  async execute() {
    const repository = AppDataSource.getRepository(Proteins);
    const proteins = await repository.find();
    return proteins;
  }
}
