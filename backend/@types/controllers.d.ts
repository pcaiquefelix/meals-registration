import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

// Tipo genérico para os métodos do controlador
type ControllerMethodPromise = (
  request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  response: Response<any, Record<string, any>>
) => Promise<Response<any, Record<string, any>>>;

type ControllerMethod = (
  request: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
  response: Response<any, Record<string, any>>
) => Response<any, Record<string, any>>;

// Interface do controlador
export interface Controllers {
  create: ControllerMethodPromise;
  get: ControllerMethodPromise;
  update: ControllerMethodPromise;
  delete: ControllerMethodPromise;
}

// Interface do controlador com recuperação de um ou todos os registros
export interface ControllersGetDiffer {
  create: ControllerMethodPromise;
  getOne: ControllerMethodPromise;
  getAll: ControllerMethodPromise;
  update: ControllerMethodPromise;
  delete: ControllerMethodPromise;
}

// Interface do controlador de Usuários
export interface UserControllerInterface {
  authentication: ControllerMethodPromise;
  getIndex: ControllerMethod;
}
