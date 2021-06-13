import { ColumnsType } from "antd/lib/table";
import { IGameKey } from "./../OpenGames/OpenGames";

export const FINISHED_COLUMNS_LIST: ColumnsType<IGameKey> = [
  {
    title: "Game ID",
    dataIndex: "gameId",
    key: "gameId",
  },
  {
    title: "Player 1",
    dataIndex: "player1",
    key: "player1",
  },
  {
    title: "Player 1",
    dataIndex: "player2",
    key: "player2",
  },
  {
    title: "Winner",
    dataIndex: "winner",
    key: "winner",
  },
];
