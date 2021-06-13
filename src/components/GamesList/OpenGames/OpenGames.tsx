import { useEffect, useState } from "react";
import { Spin, Table, Typography } from "antd";
import {
  GAME_STATUS,
  IGame,
} from "../../../services/GamesService/IGamesService";
import { GameService } from "../../../services/GamesService/GamesService";
import { getGamesListColumns } from "./constants";
import { addKeyPropToGame } from "./helpers";

export interface IGameKey extends IGame {
  key: string;
}

const OpenGames: React.FC = () => {
  const [games, setGames] = useState<IGameKey[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOpenGames = async (): Promise<void> => {
    try {
      const games: IGame[] = await GameService.getInstance().getList(
        GAME_STATUS.OPEN
      );
      const gamesWithKey: IGameKey[] = addKeyPropToGame(games);
      setGames(gamesWithKey);
    } catch (e) {
      setError("Something went wrong, try later again");
    }
  };

  const joinGame = (): void => {};

  useEffect(() => {
    fetchOpenGames();
  }, []);

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

  return (
    <Table<IGame> columns={getGamesListColumns(joinGame)} dataSource={games} />
  );
};

export default OpenGames;
