import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Board from "../../components/Board/Board";
import useGetLiveGame from "../../hooks/useGetLiveGame";
import { IBoard, IGame } from "../../services/GamesService/IGamesService";

const Game: React.FC = () => {
  const { id }: { id: string } = useParams();
  const { game, isUserTurn, hasPlayerStarted } = useGetLiveGame(id);

  if (!game) {
    return (
      <div className="flex flex-row  justify-center mt-8">
        <Spin tip="Loading..." size="large" />
      </div>
    );
  }
  const fakeBoard: IBoard = [
    [1, 1, 1],
    [0, 0, 0],
    [2, 2, 2],
  ];
  return (
    <Board
      board={fakeBoard}
      isUserTurn={isUserTurn}
      isPlayer1={hasPlayerStarted}
    />
  );
};

export default Game;
