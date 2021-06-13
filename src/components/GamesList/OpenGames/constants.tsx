import { ColumnsType } from "antd/lib/table";
import { IGame } from "../../../services/GamesService/IGamesService";
import { Button } from "antd";
import { IGameKey } from "./OpenGames";

type IJoinGame = () => void;

export const getGamesListColumns: (
  joinGame: IJoinGame
) => ColumnsType<IGameKey> = (joinGame: IJoinGame): ColumnsType<IGameKey> => [
  {
    title: "Game ID",
    dataIndex: "gameId",
    key: "gameId",
  },
  {
    title: "Host player",
    dataIndex: "player1",
    key: "player1",
  },
  {
    title: "Action",
    key: "action",
    render: () => (
      <Button onClick={joinGame} type="primary">
        Join
      </Button>
    ),
  },
];
