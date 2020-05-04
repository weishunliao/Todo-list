import { Input, Button, Checkbox, Form, Message } from "../styles/antd";
import Router from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import withoutAuth from "../hocs/withoutAuth";
import { AuthContext } from "../context/Auth";

const SignIn = (props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { setAuthentication, setToken } = React.useContext(AuthContext);

  const handleSubmit = async () => {
    await axios
      .post("http://localhost:5000/api/v1/admin/login", {
        email: email,
        password: password,
      })
      .then(async (resp) => {
        Cookies.set("__session", resp.data.user.token);
        setAuthentication(true);
        setToken(resp.data.user.token);
      })
      .catch(() => {
        Message.info("Wrong password or name.");
      });
  };

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 8,
    },
  };

  const tailLayout = {
    wrapperCol: {
      offset: 8,
      span: 16,
    },
  };
  return (
    <>
      <Button
        className="logoutBtn"
        ghost={true}
        size="large"
        onClick={() => {
          Router.push("/signup");
        }}
      >
        Register
      </Button>
      <h1 className="authTitle">Log in</h1>
      <Form
        style={{ marginTop: "50px" }}
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
          ]}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          name="email"
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          name="password"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default withoutAuth(SignIn);
