import { LOCAL_STORAGE_NAME_KEY } from "../constants/local-storage-keys";

export const setUserNameToLocalStorage = (userName: string): void =>
  localStorage.setItem(LOCAL_STORAGE_NAME_KEY, userName);

export const getUserNameFromLocalStorage = (): string | null =>
  localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
