export enum GAME_STATUS {
  OPEN = "NEW",
  IN_PROGRESS = "IN_PROGRESS",
  FINISHED = "FINISHED",
}

type IBoardSign = 0 | 1 | 2;
type IBoardRow = [IBoardSign, IBoardSign, IBoardSign];
type IBoard = [IBoardRow, IBoardRow, IBoardRow];

export interface IGame {
  _id: string;
  gameId: string;
  player1: string;
  player2: string;
  GameStatus: GAME_STATUS;
  board: IBoard;
  winner: string;
}
