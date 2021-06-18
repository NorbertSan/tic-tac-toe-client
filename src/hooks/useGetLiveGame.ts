import { GAME_ERRORS_TYPES } from "./../constants/game-errors-types";
import { PLAYER_SIGN } from "./../constants/game";
import { getUserNameFromLocalStorage } from "./../helpers/local-storage-helpers";
import { useHistory } from "react-router-dom";
import { IGame } from "./../services/GamesService/IGamesService";
import { useEffect, useState } from "react";
//@ts-ignore
import SockJS from "sockjs-client";
//@ts-ignore
import Stomp from "stompjs";
import { GameService } from "../services/GamesService/GamesService";
import { getMovesAmount } from "../helpers/board";
import { AxiosError } from "axios";

const BASE_SERVER_URL = process.env.REACT_APP_BASE_API_URL;
const userName = getUserNameFromLocalStorage();

interface IUserGetLiveGameResponse {
  game: IGame | null;
  isUserTurn: boolean;
  hasPlayerStarted: boolean;
}

const useGetLiveGame = (gameId: string): IUserGetLiveGameResponse => {
  const [game, setGame] = useState<IGame | null>(null);
  const [isUserTurn, setIsUserTurn] = useState<boolean>(false);
  const [hasPlayerStarted, setHasPlayerStarted] = useState<boolean>(false);

  const history = useHistory();

  const connectToSocket = (): void => {
    const socket = new SockJS(BASE_SERVER_URL + "gameplay");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(
        "/topic/game-progress/" + gameId,
        (response: any) => {
          const game: IGame = JSON.parse(response.body);
          console.log(game);
          if (game) {
            setGame(game);
          }
        }
      );
    });
  };

  const calculateUserTurn = () => {
    if (!game?.board) return;

    const player1MovesAmount: number = getMovesAmount(
      game.board,
      PLAYER_SIGN.player1
    );
    const player2MovesAmount: number = getMovesAmount(
      game.board,
      PLAYER_SIGN.player2
    );
    let isPlayerTurn;

    if (hasPlayerStarted) {
      isPlayerTurn = player1MovesAmount === player2MovesAmount ? true : false;
    } else {
      isPlayerTurn = player2MovesAmount < player1MovesAmount ? true : false;
    }

    setIsUserTurn(isPlayerTurn);
  };

  const joinToGame = async (): Promise<void> => {
    try {
      const game: IGame = await GameService.getInstance().joinGame(gameId);
      setHasPlayerStarted(game.player1 === userName);
      setGame(game);
      connectToSocket();
    } catch {
      history.push("/games");
    }
  };

  useEffect(() => {
    if (gameId) {
      joinToGame();
    }
  }, [gameId]);

  useEffect(() => {
    calculateUserTurn();
  }, [game]);

  return {
    game,
    isUserTurn,
    hasPlayerStarted,
  };
};

export default useGetLiveGame;
