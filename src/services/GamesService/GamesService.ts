import { getUserNameFromLocalStorage } from "./../../helpers/local-storage-helpers";
import { BOARD_SIGN } from "./../../constants/game";
import { AxiosResponse } from "axios";
import { ApiService } from "./../ApiService/ApiService";
import {
  GAME_STATUS,
  ICreateGame,
  IGame,
  IJoinGame,
  IMakeMove,
} from "./IGamesService";

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

    return gamesResponse.data.reverse();
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

  async makeMove(
    gameId: string,
    sign: BOARD_SIGN,
    cellNumber: number
  ): Promise<IGame> {
    const positionX = cellNumber % 3;
    const positionY = Math.floor(cellNumber / 3);

    const requestBody: IMakeMove = {
      sign,
      positionX,
      positionY,
      player: getUserNameFromLocalStorage(),
    };

    const gameResponse: AxiosResponse<IGame> =
      await ApiService.getAxiosInstance().patch(
        `/games/${gameId}/move`,
        requestBody
      );

    return gameResponse.data;
  }

  async joinGame(gameId: string): Promise<IGame> {
    const requestBody: IJoinGame = {
      player: getUserNameFromLocalStorage(),
    };

    const gameResponse: AxiosResponse<IGame> =
      await ApiService.getAxiosInstance().post(
        `/games/${gameId}/connect`,
        requestBody
      );

    return gameResponse.data;
  }
}
