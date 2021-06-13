import { URL } from "url";
import axios, { AxiosInstance } from "axios";

export class ApiService {
  static axiosInstance: AxiosInstance;

  static readonly BASE_URL: string | undefined =
    process.env.REACT_APP_BASE_API_URL;

  constructor() {
    if (!ApiService.BASE_URL) {
      throw "Base API url not provided !";
    }

    ApiService.axiosInstance = axios.create({
      baseURL: ApiService.BASE_URL,
      headers: {},
      responseType: "json",
    });
  }

  static getAxiosInstance(): AxiosInstance {
    if (!this.axiosInstance) {
      new ApiService();
    }

    return ApiService.axiosInstance;
  }
}
