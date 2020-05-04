import { Button } from "../styles/antd";
import Router from "next/router";
const Index = () => {
  return (
    <>
      <div
        style={{
          width: "50%",
          textAlign: "center",
          margin: "100px auto 0 ",
          fontFamily: "Sanchez,serif",
          fontSize: "25px",
          color: "#001529",
        }}
      >
        Hi, there!
        <br /> Plaese log in or create an account to access this todo list
        applicaion! 🎉🎊🎉🎈
      </div>
      <div style={{ width: "50%", textAlign: "center", margin: "0 auto" }}>
        <Button
          type="primary"
          style={{ margin: "10px" }}
          onClick={() => {
            Router.push("/signin");
          }}
        >
          Login
        </Button>
        <Button
          type="primary"
          style={{ margin: "10px" }}
          onClick={() => {
            Router.push("/signup");
          }}
        >
          Register
        </Button>
      </div>
    </>
  );
};

export default Index;
