import { AppDataSource } from "../../infrastructure/database/DataSource";
import Proteins from "../../domain/entities/Proteins";

interface UpdateProteinsInterface {
  id: number;
  name: string;
  monthly_incidence: number;
  updated_at: Date;
}

export default class UpdateProteinsService {
  async execute({
    id,
    name,
    monthly_incidence,
    updated_at,
  }: UpdateProteinsInterface) {
    const repository = AppDataSource.getRepository(Proteins);
    const protein = await repository.findOne({ where: { id } });
    if (!protein) {
      return new Error("Protein does not exist");
    }
    try {
      return await repository.update(id, {
        name,
        monthly_incidence,
        updated_at,
      });
    } catch (error) {
      return new Error("An error occurred");
    }
  }
}
