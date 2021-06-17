import { PLAYER_SIGN } from "./../constants/game";
import {
  IBoardRow,
  IBoardSign,
} from "./../services/GamesService/IGamesService";
import { IBoard } from "../services/GamesService/IGamesService";

export const getMovesAmount = (
  board: IBoard,
  playerSign: PLAYER_SIGN
): number => {
  let moveAmounts: number = 0;

  board.forEach((row: IBoardRow) =>
    row.forEach((cell: IBoardSign) => cell === playerSign && moveAmounts++)
  );

  return moveAmounts;
};

export const transformToOneDimensionBoard = (board: IBoard): IBoardSign[] =>
  board.reduce((acc: IBoardSign[], row) => [...acc, ...row], []);
