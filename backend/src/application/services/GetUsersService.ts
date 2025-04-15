import { AppDataSource } from "../../infrastructure/database/DataSource";
import Users from "../../domain/entities/Users";

export default class GetUsersService {
  async oneUserExecute(id: number) {
    const repository = AppDataSource.getRepository(Users);
    const user = await repository.findOne({ where: { id } });
    if (!user) {
      return new Error("User does not exist.");
    }
    return user;
  }

  async allUsersExecute() {
    const repository = AppDataSource.getRepository(Users);
    const users = await repository.find();
    return users;
  }
}
