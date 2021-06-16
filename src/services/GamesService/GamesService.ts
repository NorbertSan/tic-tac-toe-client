import { AxiosResponse } from "axios";
import { ApiService } from "./../ApiService/ApiService";
import { GAME_STATUS, ICreateGame, IGame } from "./IGamesService";

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

  async getGame(gameId: string): Promise<IGame> {
    const gamesResponse: AxiosResponse<IGame> =
      await ApiService.getAxiosInstance().get("/games/" + gameId);

    return gamesResponse.data;
  }

  async createGame(player1: string): Promise<IGame> {
    const requestBody: ICreateGame = { player1 };

    const gamesResponse: AxiosResponse<IGame> =
      await ApiService.getAxiosInstance().post("/games", requestBody);

    return gamesResponse.data;
  }
}
