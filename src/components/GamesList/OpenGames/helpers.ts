import { IGameKey } from "./OpenGames";
import { IGame } from "./../../../services/GamesService/IGamesService";

export const addKeyPropToGame = (games: IGame[]): IGameKey[] =>
  games.map((game) => ({ ...game, key: game.gameId }));
