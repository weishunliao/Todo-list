import React from "react";
import { Divider, List, Tag, Dropdown, Menu, Button } from "../styles/antd";
import { DeleteOutlined, FlagOutlined } from "@ant-design/icons";
import { Select } from "antd";
const { Option } = Select;

class TaskList extends React.Component {
  state = {
    type: this.props.type,
    typeId: this.props.typeId,
  };

  render() {
    const dataSource = this.props.dataSource.filter(
      (task) => task.status === this.state.typeId,
    );
    if (dataSource.length === 0) {
      return <></>;
    }
    return (
      <>
        <Divider orientation="left">{this.state.type}</Divider>
        <List
          size="large"
          bordered
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item key={item._id}>
              {item.content}
              <Select
                defaultValue={this.state.type}
                style={{ width: 120 }}
                onChange={(value) => {
                  this.props.handleStatusChange(item._id, value);
                }}
                autoFocus={true}
              >
                <Option value="1">Not started</Option>
                <Option value="2">In progess</Option>
                <Option value="3">Completed</Option>
                <Option value="4">Cancell</Option>
              </Select>
              <Dropdown
                overlay={menu({
                  handlePriorityChange: this.props.handlePriorityChange,
                  itemId: item._id,
                })}
                placement="bottomCenter"
                trigger={["click"]}
              >
                <Button
                  className={
                    item.priority === "High"
                      ? "priority_high"
                      : item.priority === "Medium"
                      ? "priority_mid"
                      : "priority_low"
                  }
                >
                  <FlagOutlined />
                </Button>
              </Dropdown>
              <DeleteOutlined
                style={{ width: "50px" }}
                onClick={() => {
                  this.props.handleDeleteTask(item._id);
                }}
              />
            </List.Item>
          )}
        />
        <style global jsx>{`
          .priority_low {
            color: #52c41a;
            background: #f6ffed;
            border-color: #52c41a;
          }

          .priority_mid {
            color: #fa8c16;
            background: #fff7e6;
            border-color: #ffd591;
          }

          .priority_high {
            color: #f5222d;
            background: #fff1f0;
            border-color: #f5222d;
          }
        `}</style>
      </>
    );
  }
}

const menu = (props) => {
  return (
    <Menu
      onClick={(e) => {
        props.handlePriorityChange(props.itemId, e.key);
      }}
    >
      <Menu.Item key="High">
        <FlagOutlined style={{ color: "red" }} />
        <span>High</span>
      </Menu.Item>
      <Menu.Item key="Medium">
        <FlagOutlined style={{ color: "#ffb14d" }} />
        <span>Medium</span>
      </Menu.Item>
      <Menu.Item key="Normal">
        <FlagOutlined style={{ color: "rgb(51, 125, 204)" }} />
        <span>Normal</span>
      </Menu.Item>
    </Menu>
  );
};

export default TaskList;
