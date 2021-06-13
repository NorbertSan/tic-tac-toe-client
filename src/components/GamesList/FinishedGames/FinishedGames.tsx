import { Spin, Table, Typography } from "antd";
import useGetGames from "../../../hooks/useGetGames";
import { GAME_STATUS } from "../../../services/GamesService/IGamesService";
import { IGameKey } from "../OpenGames/OpenGames";
import { FINISHED_COLUMNS_LIST } from "./constants";

interface IFinishedGames {
  active: boolean;
}

const FinishedGames: React.FC<IFinishedGames> = ({ active }) => {
  const { games, error } = useGetGames(GAME_STATUS.FINISHED, active);

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
        No finished games
      </Typography.Title>
    );
  }

  return <Table<IGameKey> columns={FINISHED_COLUMNS_LIST} dataSource={games} />;
};

export default FinishedGames;
