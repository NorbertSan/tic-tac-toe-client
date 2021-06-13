import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import {
  IUserNameContext,
  UserNameContext,
} from "../../context/UserNameContext";

const Login: React.FC = () => {
  const { userName } = useContext<IUserNameContext>(UserNameContext);

  if (userName) {
    return <Redirect to="/list" />;
  }

  return <div>login</div>;
};

export default Login;
