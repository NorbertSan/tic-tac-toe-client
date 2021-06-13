import React, { useEffect, useState } from "react";

export interface IUserNameContext {
  userName: string | null;
  onUserNameChange: (newUserName: string | null) => void;
}

const USER_NAME_CONTEXT_DEFAULT_VALUE: IUserNameContext = {
  userName: null,
  onUserNameChange: (newUserName: string | null) => {},
};

export const UserNameContext = React.createContext<IUserNameContext>(
  USER_NAME_CONTEXT_DEFAULT_VALUE
);

interface IUserNameProvider {
  children: React.ReactElement<any, any> | null;
}

const LOCAL_STORAGE_NAME_KEY = "userName";

export const UserNameProvider: React.FC<IUserNameProvider> = ({ children }) => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    setUserName(localStorage.getItem(LOCAL_STORAGE_NAME_KEY));
  }, []);

  const value: IUserNameContext = {
    userName,
    onUserNameChange: (newUserName: string | null) => {
      setUserName(newUserName);
    },
  };

  return (
    <UserNameContext.Provider value={value}>
      {children}
    </UserNameContext.Provider>
  );
};
