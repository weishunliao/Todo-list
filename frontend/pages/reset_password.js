import { Input, Button, Form } from "../styles/antd";
import { notification } from "antd";
import Cookies from "js-cookie";
import axios from "axios";
import { AuthContext } from "../context/Auth";
import Router from "next/router";

const ResetPassword = () => {
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const { token, setAuthentication } = React.useContext(AuthContext);

  const handleSubmit = async () => {
    if (confirmPassword !== password) {
      openNotification();
      return;
    }
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios
      .post(
        "http://localhost:5000/api/v1/admin/resetUserPassword",
        {
          newPassword: password,
        },
        config,
      )
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
      <div className="btn_wrapper">
        <Button
          className="btn"
          ghost={true}
          size="large"
          onClick={() => {
            Router.push("/signup");
          }}
        >
          Register
        </Button>
      </div>
      <h1 className="authTitle">Reset Password</h1>
      <Form
        style={{ marginTop: "50px" }}
        {...layout}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
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

export default ResetPassword;
