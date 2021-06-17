import React from "react";
import { transformToOneDimensionBoard } from "../../helpers/board";
import { IBoard, IBoardSign } from "../../services/GamesService/IGamesService";
import classnames from "classnames";
import { BOARD_SIGN, PLAYER_SIGN } from "../../constants/game";

interface IBoardProps {
  board: IBoard;
  isUserTurn: boolean;
  isPlayer1: boolean;
}

const Board: React.FC<IBoardProps> = ({ board, isUserTurn, isPlayer1 }) => {
  const oneDimensionArray: IBoardSign[] = transformToOneDimensionBoard(board);

  const renderBoard = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];

    for (let i = 0; i < 9; i++) {
      const isCellDisabled =
        isUserTurn || oneDimensionArray[i] !== PLAYER_SIGN.empty;

      const cellClasses = classnames("cell", { disabled: isCellDisabled });

      let sign;

      if (oneDimensionArray[i] === PLAYER_SIGN.player1)
        sign = BOARD_SIGN.player1;
      else if (oneDimensionArray[i] === PLAYER_SIGN.player2)
        sign = BOARD_SIGN.player2;
      else sign = BOARD_SIGN.empty;

      cells.push(
        <button disabled={isCellDisabled} className={cellClasses} key={i}>
          {sign}
        </button>
      );
    }
    return cells;
  };

  return <section className="grid_board mx-auto">{renderBoard()}</section>;
};

export default Board;
