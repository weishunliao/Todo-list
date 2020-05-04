import { Input, Button, Form } from "../styles/antd";
import { notification } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/Auth";
import Router from "next/router";

const SignUp = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { setAuthentication } = React.useContext(AuthContext);
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
  const handleSubmit = async () => {
    if (confirmPassword !== password) {
      openNotification();
      return;
    }

    await axios
      .post("http://localhost:5000/api/v1/admin/createUser", {
        email: email,
        password: password,
        role: "private",
      })
      .then(async () => {
        Cookies.remove("__session");
        setAuthentication(false);
      })
      .catch((error) => {
        alert("Something wrong");
      });
    Router.push("/signin");
  };

  const openNotification = () => {
    const args = {
      message: "Password mismatch.",
      description: "Please retype the password.",
      duration: 3,
    };
    notification.open(args);
  };

  return (
    <>
      <div className="btn_wrapper">
        <Button
          className="btn"
          ghost={true}
          size="large"
          onClick={() => {
            Router.push("/signin");
          }}
        >
          Sign in
        </Button>
      </div>
      <h1 className="authTitle">Register</h1>
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
        <Form.Item
          label="Confirm password"
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
          ]}
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          name="confirmPassword"
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" onClick={handleSubmit}>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <style global jsx>{``}</style>
    </>
  );
};

export default SignUp;
