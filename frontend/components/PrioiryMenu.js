import { Menu } from "../styles/antd";
import { FlagOutlined } from "@ant-design/icons";

export const PriorityMenu = (props) => {
  return (
    <Menu
      onClick={(e) => {
        props.handlePriorityChange(props.itemId, e.key);
      }}
    >
      <Menu.Item key="High">
        <FlagOutlined id="priority_high_btn" />
        <span>High</span>
      </Menu.Item>
      <Menu.Item key="Medium">
        <FlagOutlined id="priority_mid_btn" />
        <span>Medium</span>
      </Menu.Item>
      <Menu.Item key="Normal">
        <FlagOutlined id="priority_low_btn" />
        <span>Normal</span>
      </Menu.Item>
    </Menu>
  );
};
