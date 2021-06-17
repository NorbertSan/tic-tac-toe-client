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
  GameStatus: GAME_STATUS;
  board: IBoard;
  winner: string;
}

export interface ICreateGame {
  player1: string;
}
