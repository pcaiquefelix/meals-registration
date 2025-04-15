import { AppDataSource } from "../../infrastructure/database/DataSource";
import Users from "../../domain/entities/Users";

export default class DeleteUsersService {
  async execute(id: number) {
    const repository = AppDataSource.getRepository(Users);
    if (!(await repository.findOne({ where: { id } }))) {
      return new Error("User does not exist.");
    }
    return await repository.delete(id);
  }
}
