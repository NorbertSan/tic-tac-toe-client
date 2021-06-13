import { Spin, Table, Typography } from "antd";
import {
  GAME_STATUS,
  IGame,
} from "../../../services/GamesService/IGamesService";
import { getGamesListColumns } from "./constants";
import useGetGames from "../../../hooks/useGetGames";

export interface IGameKey extends IGame {
  key: string;
}
interface IOpenGames {
  active: boolean;
}

const OpenGames: React.FC<IOpenGames> = ({ active }) => {
  const { games, error } = useGetGames(GAME_STATUS.OPEN, active);

  const joinGame = (): void => {};

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
    <Table<IGameKey>
      columns={getGamesListColumns(joinGame)}
      dataSource={games}
    />
  );
};

export default OpenGames;
