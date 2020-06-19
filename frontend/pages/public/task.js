import { Row, Col } from "antd";
import { getPriorityId } from "../../components/TaskList";
import { statusTable } from "../board";
import {
  TaskContent,
  TaskTitle,
  TaskTitleWapper,
  TaskContentTitle,
} from "../../components/public/task";
import { FlagOutlined, CaretRightFilled } from "@ant-design/icons";
import axios from "axios";
import config from "../../config/environment";

const PublicTask = (props) => {
  return (
    <Row justify="center">
      <Col span={8} className="publicTaskWrapper">
        <TaskTitleWapper>
          <TaskTitle>{props.content}</TaskTitle>
        </TaskTitleWapper>
        <TaskContentTitle>
          Task Owner:<TaskContent>{props.userEmail}</TaskContent>
        </TaskContentTitle>
        <TaskContentTitle>
          Status:
          <TaskContent>
            <CaretRightFilled
              style={{ margin: "0 10px" }}
              id={getStatus(props.status)}
            />
            {statusTable[props.status - 1].type}
          </TaskContent>
        </TaskContentTitle>
        <TaskContentTitle>
          Priority:
          <TaskContent>
            <FlagOutlined
              id={getPriorityId(props.priority)}
              style={{ margin: "0 10px" }}
            />
            {props.priority}
          </TaskContent>
        </TaskContentTitle>
        <TaskContentTitle>
          Created Date:<TaskContent>{props.created}</TaskContent>
        </TaskContentTitle>
      </Col>
    </Row>
  );
};

PublicTask.getInitialProps = async (ctx) => {
  const resp = await axios.get(config.API + "/v1/board/task/" + ctx.query.id);
  if (resp.status === 200) {
    return resp.data.task;
  } else {
    alert("Something wrong");
  }
};

export const getStatus = (status) => {
  return status === 1
    ? "not_started"
    : status === 2
    ? "in_progess"
    : status === 3
    ? "completed"
    : "cancell";
};

export default PublicTask;
