import React, { useContext } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { Redirect } from "react-router-dom";
import {
  IUserNameContext,
  UserNameContext,
} from "../../context/UserNameContext";
import { setUserNameToLocalStorage } from "../../helpers/local-storage-helpers";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface IFormValues {
  userName: string;
}

const Login: React.FC = () => {
  const { userName, onUserNameChange } =
    useContext<IUserNameContext>(UserNameContext);

  if (userName) {
    console.log("her");
    return <Redirect to="/games" />;
  }

  const onFinish = (formValues: IFormValues): void => {
    setUserNameToLocalStorage(formValues.userName);
    onUserNameChange(formValues.userName);
  };

  return (
    <section className="flex flex-row justify-center">
      <Form {...layout} name="basic" onFinish={onFinish}>
        <Form.Item
          name="userName"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            style={{ width: 500 }}
            placeholder="Username"
            size="large"
            prefix={<UserOutlined />}
          />
        </Form.Item>
        <Form.Item>
          <Button className="mt-4" type="primary" htmlType="submit">
            LOGIN
          </Button>
        </Form.Item>
      </Form>
    </section>
  );
};

export default Login;
