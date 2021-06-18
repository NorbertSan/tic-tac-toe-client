import { BOARD_SIGN } from "./../../constants/game";
export enum GAME_STATUS {
  OPEN = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

export type IBoardSign = 0 | 1 | 2;
export type IBoardRow = [IBoardSign, IBoardSign, IBoardSign];
export type IBoard = [IBoardRow, IBoardRow, IBoardRow];

export interface IGame {
  _id: string;
  gameId: string;
  player1: string;
  player2: string;
  status: GAME_STATUS;
  board: IBoard;
  winner: string;
  draw: boolean;
}

export interface ICreateGame {
  player1: string;
}

export interface IMakeMove {
  sign: BOARD_SIGN;
  positionX: number;
  positionY: number;
  player: string;
}

export interface IJoinGame {
  player: string;
}
