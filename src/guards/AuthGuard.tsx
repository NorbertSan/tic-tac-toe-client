import { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserNameContext, IUserNameContext } from "../context/UserNameContext";

interface IAuthGuard {
  children: React.ReactElement<any, any> | null;
}

const AuthGuard: React.FC<IAuthGuard> = ({ children }) => {
  const { userName } = useContext<IUserNameContext>(UserNameContext);

  if (!userName) {
    return <Redirect to="/login" />;
  }

  return children;
};

export default AuthGuard;
