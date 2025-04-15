import { Request, Response } from "express";
import CreateProteinasService from "../../application/services/CreateProteinsService";
import GetProteinasService from "../../application/services/GetProteinsService";
import UpdateProteinasService from "../../application/services/UpdateProteinsService";
import DeleteProteinasService from "../../application/services/DeleteProteinsService";
import proteins from "../../domain/entities/Proteins";
import { ValidationError } from "class-validator";
import { Controllers } from "../../../@types/controllers";

export default class ProteinsController implements Controllers {
  async create(request: Request, response: Response) {
    const { name, monthly_incidence }: proteins = request.body;
    const createProteinasService = new CreateProteinasService();
    const result = await createProteinasService.execute(
      name,
      monthly_incidence
    );
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    } else if (
      Array.isArray(result) &&
      result.every((error) => error instanceof ValidationError)
    ) {
      return response.status(400).json(result);
    }
    return response
      .status(200)
      .json({ message: "Protein created successfully!" });
  }

  async get(request: Request, response: Response) {
    const getProteinasService = new GetProteinasService();
    const result = await getProteinasService.execute();
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response.json(result);
  }

  async update(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const { name, monthly_incidence }: proteins = request.body;
    const updated_at = new Date();
    const updateProteinasService = new UpdateProteinasService();
    const result = await updateProteinasService.execute({
      id,
      name,
      monthly_incidence,
      updated_at,
    });
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response
      .status(200)
      .json({ message: "Protein updated successfully!" });
  }

  async delete(request: Request, response: Response) {
    const id = parseInt(request.params.id);
    const deleteProteinasService = new DeleteProteinasService();
    const result = await deleteProteinasService.execute(id);
    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }
    return response
      .status(200)
      .json({ message: "Protein deleted successfully!" });
  }
}
