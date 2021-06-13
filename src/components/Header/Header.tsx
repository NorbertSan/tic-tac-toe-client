import { Typography, Divider } from "antd";
import { useContext } from "react";
import {
  IUserNameContext,
  UserNameContext,
} from "../../context/UserNameContext";

const Header: React.FC = () => {
  const { userName } = useContext<IUserNameContext>(UserNameContext);

  return (
    <>
      <header className="text-center mt-8">
        <Typography.Title>Tic-tac-toe</Typography.Title>
        {userName && (
          <Typography.Title className="ml-auto" level={4}>
            {userName}
          </Typography.Title>
        )}
      </header>
      <Divider />
    </>
  );
};

export default Header;
