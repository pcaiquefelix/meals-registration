import { AxiosRequestConfig, AxiosResponse } from "axios";
import nextApi from "./nextApi";

async function postPutStructure(
  method: "post" | "put",
  path: string,
  data?: any,
  config?: AxiosRequestConfig<any>
) {
  try {
    const response = await nextApi[method](path, data, config);
    return response.data;
  } catch (error) {
    return new Error(error.response.data);
  }
}

async function getDelStructure(
  method: "get" | "delete",
  path: string,
  config?: AxiosRequestConfig<any>
) {
  try {
    const response = await nextApi[method](path, config);
    return response.data;
  } catch (error) {
    return new Error(error.response.data);
  }
}

export class NextApiHandler {
  static async get(
    path: string,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any> | Error> {
    return getDelStructure("get", path, config);
  }

  static async post(
    path: string,
    data?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any> | Error> {
    return postPutStructure("post", path, data, config);
  }

  static async put(
    path: string,
    data?: any,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any> | Error> {
    return postPutStructure("put", path, data, config);
  }

  static async delete(
    path: string,
    config?: AxiosRequestConfig<any>
  ): Promise<AxiosResponse<any> | Error> {
    return getDelStructure("delete", path, config);
  }
}
