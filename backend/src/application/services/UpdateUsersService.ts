import { AppDataSource } from "../../infrastructure/database/DataSource";
import Users from "../../domain/entities/Users";

interface UpdateUsersInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  updated_at: Date;
}

export default class UpdateUsersService {
  async execute({
    id,
    name,
    email,
    password,
    role,
    updated_at,
  }: UpdateUsersInterface) {
    const repository = AppDataSource.getRepository(Users);
    const user = await repository.findOne({ where: { id } });
    if (!user) {
      return new Error("User does not exist.");
    }
    try {
      Object.assign(user, { name, email, role, password, updated_at });

      return await repository.save(user);
    } catch (error) {
      return new Error("An error occurred.");
    }
  }
}
