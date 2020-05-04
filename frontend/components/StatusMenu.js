import { Menu } from "../styles/antd";
import { CaretRightFilled } from "@ant-design/icons";

export const StatusMenu = (props) => {
  return (
    <Menu
      onClick={(e) => {
        props.handleStatusChange(props.itemId, e.key);
      }}
    >
      <Menu.Item key="1">
        <CaretRightFilled id="not_started" />
        <span>Not started</span>
      </Menu.Item>
      <Menu.Item key="2">
        <CaretRightFilled id="in_progess" />
        <span>In progess</span>
      </Menu.Item>
      <Menu.Item key="3">
        <CaretRightFilled id="completed" />
        <span>Completed</span>
      </Menu.Item>
      <Menu.Item key="4">
        <CaretRightFilled id="cancell" />
        <span>Cancell</span>
      </Menu.Item>
    </Menu>
  );
};
