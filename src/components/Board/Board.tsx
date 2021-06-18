import React, { useState } from "react";
import { transformToOneDimensionBoard } from "../../helpers/board";
import { IBoard, IBoardSign } from "../../services/GamesService/IGamesService";
import classnames from "classnames";
import { BOARD_SIGN, PLAYER_SIGN } from "../../constants/game";
import { GameService } from "../../services/GamesService/GamesService";
import { useParams } from "react-router-dom";

interface IBoardProps {
  board: IBoard;
  isUserTurn: boolean;
  isPlayer1: boolean;
  boardDisabled: boolean;
}

const Board: React.FC<IBoardProps> = ({
  board,
  isUserTurn,
  isPlayer1,
  boardDisabled,
}) => {
  const { id }: { id: string } = useParams();
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const oneDimensionArray: IBoardSign[] = transformToOneDimensionBoard(board);

  const makeMove = async (cellNumber: number): Promise<void> => {
    setIsSaving(true);
    try {
      const boardSign: BOARD_SIGN = isPlayer1
        ? BOARD_SIGN.player1
        : BOARD_SIGN.player2;
      await GameService.getInstance().makeMove(id, boardSign, cellNumber);
      setIsSaving(false);
    } catch (e) {
      console.error(e);
    }
  };

  const renderBoard = (): JSX.Element[] => {
    const cells: JSX.Element[] = [];

    for (let i = 0; i < 9; i++) {
      const isCellDisabled =
        !isUserTurn ||
        boardDisabled ||
        isSaving ||
        oneDimensionArray[i] !== PLAYER_SIGN.empty;

      const cellClasses = classnames("cell", { disabled: isCellDisabled });

      let sign: BOARD_SIGN;

      if (oneDimensionArray[i] === PLAYER_SIGN.player1)
        sign = BOARD_SIGN.player1;
      else if (oneDimensionArray[i] === PLAYER_SIGN.player2)
        sign = BOARD_SIGN.player2;
      else sign = BOARD_SIGN.empty;

      cells.push(
        <button
          disabled={isCellDisabled}
          onClick={() => makeMove(i)}
          className={cellClasses}
          key={i}
        >
          {sign}
        </button>
      );
    }
    return cells;
  };

  return <section className="grid_board mx-auto">{renderBoard()}</section>;
};

export default Board;
