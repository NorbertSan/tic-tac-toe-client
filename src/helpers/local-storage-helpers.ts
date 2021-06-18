import { LOCAL_STORAGE_NAME_KEY } from "../constants/local-storage-keys";

export const setUserNameToLocalStorage = (userName: string): void =>
  localStorage.setItem(LOCAL_STORAGE_NAME_KEY, userName);

export const getUserNameFromLocalStorage = (): string =>
  localStorage.getItem(LOCAL_STORAGE_NAME_KEY) as string;
