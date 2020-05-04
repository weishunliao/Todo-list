import React from "react";
import { Divider, List, Dropdown, Button, Message } from "../styles/antd";
import { PriorityMenu } from "../components/PrioiryMenu";
import { StatusMenu } from "../components/StatusMenu";
import { DeleteOutlined, FlagOutlined, LinkOutlined } from "@ant-design/icons";

class TaskList extends React.Component {
  state = {
    type: this.props.type,
    typeId: this.props.typeId,
  };
  onCopy = (id) => {
    navigator.clipboard.writeText("http://localhost:3004/public/task?id=" + id);
    Message.success("Link copied!");
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
        <Divider orientation="left" className="taskDivider">
          {this.state.type}
        </Divider>
        <List
          size="large"
          bordered
          dataSource={dataSource}
          renderItem={(item) => (
            <List.Item key={item._id} style={{ display: "flex" }}>
              {item.content}
              <div>
                <Dropdown
                  className="statusDropdown"
                  overlay={StatusMenu({
                    handleStatusChange: this.props.handleStatusChange,
                    itemId: item._id,
                  })}
                  placement="bottomCenter"
                  trigger={["click"]}
                >
                  <Button
                    id={getStatusId(this.state.typeId)}
                    className="status-btn"
                  >
                    {this.state.type}
                  </Button>
                </Dropdown>
                <Dropdown
                  overlay={PriorityMenu({
                    handlePriorityChange: this.props.handlePriorityChange,
                    itemId: item._id,
                  })}
                  placement="bottomCenter"
                  trigger={["click"]}
                >
                  <Button id={getPriorityId(item.priority)}>
                    <FlagOutlined />
                  </Button>
                </Dropdown>
                <a
                  id="deleteLink"
                  onClick={() => {
                    this.onCopy(item._id);
                  }}
                >
                  <LinkOutlined />
                </a>
                <DeleteOutlined
                  className="deleteIcon"
                  onClick={() => {
                    this.props.handleDeleteTask(item._id);
                  }}
                />
              </div>
            </List.Item>
          )}
        />
        <style global jsx>{`
          .deleteIcon {
            width: 70px;
            fontsize: 15px;
          }
          .taskDivider {
            font-family: "Sanchez", serif;
            font-size: 21px;
          }
        `}</style>
      </>
    );
  }
}

export const getPriorityId = (priority) => {
  return priority === "High"
    ? "priority_high"
    : priority === "Medium"
    ? "priority_mid"
    : "priority_low";
};

export const getStatusId = (status) => {
  return status === 1
    ? "not_started_btn"
    : status === 2
    ? "in_progess_btn"
    : status === 3
    ? "completed_btn"
    : "cancell_btn";
};

export default TaskList;
