import { AppDataSource } from "../../infrastructure/database/DataSource";
import Users from "../../domain/entities/Users";

interface CreateUsersInterface {
  name: string;
  email: string;
  password: string;
  role: string;
}

export default class CreateUsersService {
  async execute({ name, email, password, role }: CreateUsersInterface) {
    if (!email) {
      return new Error("Please provide an email.");
    }
    const repository = AppDataSource.getRepository(Users);
    if (await repository.findOne({ where: { email } })) {
      return new Error("Email is already in use.");
    }
    try {
      const newUser = repository.create({ name, email, password, role });
      await repository.save(newUser);
      return newUser;
    } catch (error) {
      return new Error("An error occurred.");
    }
  }
}
