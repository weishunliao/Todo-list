import styled from "styled-components";
import logo from "../static/logo.svg";
import { Row, Col } from "antd";
import { Layout } from "antd";

const Head = () => {
  return (
    <Layout>
      <HeadWrapper>
        <Row justify="space-between">
          <Col span={8}>
            <Logo />
          </Col>
          <Col span={8} style={{ textAlign: "center" }}>
            <Name>ToDo</Name>
          </Col>
          <Col span={8}></Col>
        </Row>
      </HeadWrapper>
    </Layout>
  );
};

export default Head;

const HeadWrapper = styled.div`
  height: 64px;
  padding: 0 50px;
  color: rgba(0, 0, 0, 0.65);
  line-height: 64px;
  background: #001529;
`;

const Logo = styled.div`
  width: 100px;
  height: 64px;
  background: url(${logo});
  background-repeat: no-repeat;
  background-position: center;
  background-size: 45%;
`;

const Name = styled.div`
  font-family: "Sanchez", serif;
  color: white;
  font-size: 30px;
`;
