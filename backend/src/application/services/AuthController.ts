import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Users from "../../domain/entities/Users";
import { AppDataSource } from "../../infrastructure/database/DataSource";

interface UserResponse {
  id: number;
  name: string;
  role: string;
  token: string;
}

export default class AuthController {
  async authenticate(email: string, password: string) {
    const repository = AppDataSource.getRepository(Users);
    const user = await repository.findOne({ where: { email } });

    if (!user) {
      return new Error("User does not exist");
    } else if (!password) {
      return new Error("Password not provided");
    }

    let isPasswordValid: boolean;

    try {
      isPasswordValid = await bcrypt.compare(password, user.password);
    } catch (error) {
      return new Error("Error validating password");
    }

    if (!isPasswordValid) {
      return new Error("Incorrect email or password");
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      return new Error(
        "Information for generating access token is not present.\nContact support"
      );
    }

    const id: number = user.id;
    const name: string = user.name;
    const role: string = user.role;
    const token: string = jwt.sign({ id: user.id }, secret);
    const userResponse: UserResponse = {
      id,
      name,
      role,
      token,
    };

    return userResponse;
  }
}
