import React from "react";
import classnames from "classnames";
import { BOARD_SIGN } from "../../constants/game";

interface ITurnHeaderProps {
  isUserTurn: boolean;
  opponentName: string;
  hasPlayerStarted: boolean;
}

const TurnHeader: React.FC<ITurnHeaderProps> = ({
  isUserTurn,
  opponentName,
  hasPlayerStarted,
}) => {
  return (
    <header className="flex justify-between w-1/2 mx-auto text-lg">
      <span className={classnames({ indicator: isUserTurn })}>
        You&nbsp;{hasPlayerStarted ? BOARD_SIGN.player1 : BOARD_SIGN.player2}
      </span>
      <span className={classnames({ indicator: !isUserTurn })}>
        {opponentName}&nbsp;
        {hasPlayerStarted ? BOARD_SIGN.player2 : BOARD_SIGN.player1}
      </span>
    </header>
  );
};

export default TurnHeader;
