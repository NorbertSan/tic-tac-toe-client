import { Redirect } from "react-router-dom";

const LOCAL_STORAGE_NAME_KEY = "userName";

interface IAuthGuard {
  children: React.ReactElement<any, any> | null;
}

const AuthGuard: React.FC<IAuthGuard> = ({ children }) => {
  const userName: string | null = localStorage.getItem(LOCAL_STORAGE_NAME_KEY);

  if (!userName) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;
