import { Request, Response } from "express";
import users from "../../domain/entities/Users";
import CreateUsuariosService from "../../application/services/CreateUsersService";
import DeleteUsuariosService from "../../application/services/DeleteUsersService";
import GetUsuariosService from "../../application/services/GetUsersService";
import UpdateUsuariosService from "../../application/services/UpdateUsersService";
import AuthController from "../../application/services/AuthController";
import { UserControllerInterface } from "../../../@types/controllers";

export default class UsersController implements UserControllerInterface {
  getIndex(request: Request, response: Response) {
    return response.send({ userId: request.userId });
  }

  async authentication(request: Request, response: Response) {
    const { email, password }: users = request.body;
    const authController = new AuthController();
    const result = await authController.authenticate(email, password);
    if (result instanceof Error) {
      return response.status(401).json(result.message);
    }
    return response.json(result);
  }

  async create(request: Request, response: Response) {
    const { name, email, role }: users = request.body;
    const createUsuariosService = new CreateUsuariosService();
    const tempPassword = "Temp123";
    const result = await createUsuariosService.execute({
      name,
      email: email.toLowerCase(),
      password: tempPassword,
      role,
    });
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.status(200).json({ message: "User created successfully!" });
  }

  async getOne(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const getUsuariosService = new GetUsuariosService();
    const result = await getUsuariosService.oneUserExecute(id);
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }

  async getAll(request: Request, response: Response) {
    const getUsuariosService = new GetUsuariosService();
    const result = await getUsuariosService.allUsersExecute();
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { name, email, password, role }: users = request.body;
    const updated_at = new Date();
    const updateUsuariosService = new UpdateUsuariosService();
    const result = await updateUsuariosService.execute({
      id,
      name,
      email,
      password,
      role,
      updated_at,
    });
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.status(200).json({ message: "User updated successfully!" });
  }

  async delete(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const deleteUsuariosService = new DeleteUsuariosService();
    const result = await deleteUsuariosService.execute(id);
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.status(200).json({ message: "User deleted successfully!" });
  }
}
