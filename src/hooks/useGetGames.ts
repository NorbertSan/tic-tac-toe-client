import { addKeyPropToGame } from "./../components/GamesList/helpers";
import { IGame } from "./../services/GamesService/IGamesService";
import { useEffect, useRef } from "react";
import { IGameKey } from "./../components/GamesList/OpenGames/OpenGames";
import { useState } from "react";
import { GAME_STATUS } from "../services/GamesService/IGamesService";
import { GameService } from "../services/GamesService/GamesService";

interface IUseGetGamesResponse {
  games: IGameKey[] | null;
  error: string | null;
}

const refreshFrequency = 10;

const useGetGames = (
  status: GAME_STATUS,
  active: boolean
): IUseGetGamesResponse => {
  const [games, setGames] = useState<IGameKey[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>();

  const fetchGames = async (): Promise<void> => {
    try {
      setError(null);
      const games: IGame[] = await GameService.getInstance().getList(status);
      const gamesWithKey: IGameKey[] = addKeyPropToGame(games);
      setGames(gamesWithKey);
    } catch (e) {
      setError("Something went wrong, try later again");
    }
  };

  const setNewInterval = () => {
    const interval = setInterval(() => {
      fetchGames();
    }, refreshFrequency * 1000);
    timerRef.current = interval;
  };

  const clearOldInterval = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  useEffect(() => {
    if (active) {
      fetchGames();
      clearOldInterval();
      setNewInterval();
    } else {
      clearOldInterval();
    }
    return () => clearOldInterval();
  }, [active]);

  return { games, error };
};

export default useGetGames;
