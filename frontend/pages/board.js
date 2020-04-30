import { Button, Input, Divider, List, Item } from "../styles/antd";
import { DeleteOutlined } from "@ant-design/icons";
import {
  handleInputChangeAction,
  handleAddNewTaskAction,
  handleInitialItemAction,
  handleDeleteTaskAction,
} from "../redux/actionCreators/boardActionCreator";
import { connect } from "react-redux";
import axios from "axios";

class Board extends React.Component {
  render() {
    return (
      <>
        <h1>This is board</h1>
        <Input
          placeholder="Add something..."
          value={this.props.inputValue}
          onChange={this.props.handleInputChange}
        />
        <Button type="primary" onClick={this.props.handleAddNewTask.bind(this)}>
          Primary
        </Button>
        <Divider orientation="left">In process</Divider>
        <List
          size="large"
          bordered
          dataSource={this.props.items}
          renderItem={(item) => (
            <List.Item key={item._id}>
              {item.content}
              <DeleteOutlined
                onClick={() => {
                  this.props.handleDeleteTask(item._id);
                }}
              />
            </List.Item>
          )}
        />
      </>
    );
  }
}

Board.getInitialProps = async (props) => {
  const resp = await axios.get("http://localhost:5000/api/v1/board/tasks/all");
  const items = resp.data.tasks;
  props.reduxStore.dispatch(handleInitialItemAction(items));
  return { items };
};

const mapStateToProps = (state) => {
  return {
    inputValue: state.boardReducer.inputValue,
    items: state.boardReducer.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handleInputChange(e) {
      dispatch(handleInputChangeAction(e.target.value));
    },
    handleAddNewTask() {
      dispatch(handleAddNewTaskAction(this.props.inputValue));
    },
    handleDeleteTask(index) {
      dispatch(handleDeleteTaskAction(index));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
