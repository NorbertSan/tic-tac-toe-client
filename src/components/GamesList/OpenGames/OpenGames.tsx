import { Button, Spin, Table, Typography } from "antd";
import {
  GAME_STATUS,
  ICreateGame,
  IGame,
} from "../../../services/GamesService/IGamesService";
import { getGamesListColumns } from "./constants";
import useGetGames from "../../../hooks/useGetGames";
import { useHistory } from "react-router-dom";
import { GameService } from "../../../services/GamesService/GamesService";
import { getUserNameFromLocalStorage } from "../../../helpers/local-storage-helpers";

export interface IGameKey extends IGame {
  key: string;
}
interface IOpenGames {
  active: boolean;
}

const OpenGames: React.FC<IOpenGames> = ({ active }) => {
  const history = useHistory();
  const { games, error } = useGetGames(GAME_STATUS.OPEN, active);

  const redirectToGame = (gameId: string): void => {
    history.push("/games/" + gameId);
  };

  const createNewGame = async (): Promise<void> => {
    try {
      const game: IGame = await GameService.getInstance().createGame(
        String(getUserNameFromLocalStorage())
      );
      redirectToGame(game.gameId);
    } catch {
      window.prompt("Something went wrong, try again");
    }
  };

  if (error) {
    return <Typography.Text type="danger">{error}</Typography.Text>;
  }

  if (!games) {
    return (
      <div className="flex flex-row  justify-center mt-8">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  if (games.length === 0) {
    return (
      <Typography.Title className="text-center mt-8" level={5}>
        No opened games
      </Typography.Title>
    );
  }

  return (
    <>
      <Table<IGameKey>
        columns={getGamesListColumns(redirectToGame)}
        dataSource={games}
      />
      <footer>
        <Button className="m-4" onClick={() => createNewGame()} type="primary">
          Create game
        </Button>
      </footer>
    </>
  );
};

export default OpenGames;
