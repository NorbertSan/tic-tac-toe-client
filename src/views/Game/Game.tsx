import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { GameService } from "../../services/GamesService/GamesService";
import { IGame } from "../../services/GamesService/IGamesService";

const Game: React.FC = () => {
  const [game, setGame] = useState<IGame | null>(null);
  const { id }: { id: string } = useParams();
  const history = useHistory();

  const getGame = async () => {
    try {
      const gameRes: IGame = await GameService.getInstance().getGame(id);
      setGame(gameRes);
    } catch {
      history.push("/games");
    }
  };

  useEffect(() => {
    getGame();
  }, []);

  if (!game) {
    return (
      <div className="flex flex-row  justify-center mt-8">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }

  return <div>{JSON.stringify(game)}</div>;
};

export default Game;
