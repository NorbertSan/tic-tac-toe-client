import { AxiosResponse } from "axios";
import { ApiService } from "./../ApiService/ApiService";
import { GAME_STATUS, IGame } from "./IGamesService";

export class GameService {
  static instance: GameService | null = null;

  constructor() {}

  static getInstance(): GameService {
    if (!this.instance) {
      this.instance = new GameService();
    }
    return this.instance;
  }

  async getList(status: GAME_STATUS): Promise<IGame[]> {
    const gamesResponse: AxiosResponse<IGame[]> =
      await ApiService.getAxiosInstance().get("/games", {
        params: {
          status: status,
        },
      });

    return gamesResponse.data;
  }
}
