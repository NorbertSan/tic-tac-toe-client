import { Button, Spin, Typography } from "antd";
import { useHistory, useParams } from "react-router-dom";
import Board from "../../components/Board/Board";
import TurnHeader from "../../components/TurnHeader/TurnHeader";
import useGetLiveGame from "../../hooks/useGetLiveGame";
import { GAME_STATUS, IBoard } from "../../services/GamesService/IGamesService";

const Game: React.FC = () => {
  const { id }: { id: string } = useParams();
  const history = useHistory();
  const { game, isUserTurn, hasPlayerStarted } = useGetLiveGame(id);

  const hasGameStarted = Boolean(!game?.player1 || !game?.player2);

  const isWinner = game?.winner;
  const isBoardDisabled: boolean = hasGameStarted || Boolean(isWinner);

  const backToList = (): void => {
    history.push("/games");
  };

  const getTitle = (): JSX.Element | null => {
    switch (game?.status) {
      case GAME_STATUS.OPEN:
        return (
          <Typography.Title level={4} className="text-center">
            Waiting for second player ...
          </Typography.Title>
        );
      case GAME_STATUS.IN_PROGRESS:
        return (
          <TurnHeader
            isUserTurn={isUserTurn}
            opponentName={hasPlayerStarted ? game.player2 : game.player1}
            hasPlayerStarted={hasPlayerStarted}
          />
        );
      case GAME_STATUS.FINISHED:
        return (
          <Typography.Title level={4} className="text-center">
            {game.winner ? `${game.winner} won` : "Draw"}
          </Typography.Title>
        );

      default:
        return null;
    }
  };

  if (!game) {
    return (
      <div className="flex flex-row  justify-center mt-8">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return (
    <>
      {getTitle()}
      <Button className="mx-auto my-4" onClick={backToList}>
        Back to list
      </Button>
      <Board
        board={game.board}
        isUserTurn={isUserTurn}
        isPlayer1={hasPlayerStarted}
        boardDisabled={isBoardDisabled}
      />
    </>
  );
};

export default Game;
