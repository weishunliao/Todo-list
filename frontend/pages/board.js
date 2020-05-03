import { Input, Button } from "../styles/antd";
import axios from "axios";
import withAuth from "../hocs/withAuth";
import { AuthContext } from "../context/Auth";
import Cookies from "js-cookie";
import Router from "next/router";
import TaskList from "../components/TaskList";

const statusTable = [
  { id: 1, type: "Not started" },
  { id: 2, type: "In progess" },
  { id: 3, type: "Completed" },
  { id: 4, type: "Cancell" },
];

const Board = (props) => {
  const [inputValue, setInputValue] = React.useState("");
  const [tasks, setTasks] = React.useState(props.tasks);
  const { token, setAuthentication, setToken } = React.useContext(AuthContext);

  const handleAddNewTask = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    const body = {
      content: inputValue,
    };

    const resp = await axios.post(
      "http://localhost:5000/api/v1/board/task",
      body,
      config,
    );
    if (resp.status === 200) {
      tasks.push(resp.data);
      setTasks(tasks);
      setInputValue("");
    } else {
      alert("Something wrong");
    }
  };
  const handleDeleteTask = async (taskId) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const resp = await axios.delete(
      "http://localhost:5000/api/v1/board/task/" + taskId,
      config,
    );
    if (resp.status === 200) {
      const newTasks = tasks.filter((task) => task._id !== taskId);
      setTasks(newTasks);
    } else {
      alert("Something wrong");
    }
  };

  const handleStatusChange = async (taskId, newStatus) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body = {
      status: newStatus,
    };
    const resp = await axios.patch(
      "http://localhost:5000/api/v1/board/task/" + taskId + "/status",
      body,
      config,
    );

    if (resp.status === 200) {
      const updated = tasks.map((task) => {
        if (task._id === taskId) {
          task.status = parseInt(newStatus);
        }
        return task;
      });

      setTasks(updated);
    } else {
      alert("Something wrong");
    }
  };

  const handlePriorityChange = async (taskId, newPriority) => {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const body = {
      priority: newPriority,
    };
    const resp = await axios.patch(
      "http://localhost:5000/api/v1/board/task/" + taskId + "/priority",
      body,
      config,
    );

    if (resp.status === 200) {
      const updated = tasks.map((task) => {
        if (task._id === taskId) {
          task.priority = newPriority;
        }
        return task;
      });

      setTasks(updated);
    } else {
      alert("Something wrong");
    }
  };

  const handleResetPassword = () => {
    Router.push("/reset_password");
  };

  const handleLogOut = () => {
    setAuthentication(false);
    setToken("");
    Cookies.remove("__session");
  };

  return (
    <>
      <h1>This is board</h1>
      <Button
        className="logoutBtn"
        ghost={true}
        size="large"
        onClick={handleLogOut}
      >
        Log out
      </Button>
      <Input
        placeholder="Add something..."
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onPressEnter={handleAddNewTask}
      />
      {statusTable.map((status) => {
        return (
          <TaskList
            key={status.type}
            dataSource={tasks}
            type={status.type}
            typeId={status.id}
            handleDeleteTask={handleDeleteTask}
            handleStatusChange={handleStatusChange}
            handlePriorityChange={handlePriorityChange}
            statusTable={statusTable}
          />
        );
      })}
      <Button onClick={handleResetPassword}>Change password</Button>
      <style global jsx>{``}</style>
    </>
  );
};
Board.getInitialProps = async (ctx) => {
  let token = "";
  if (ctx.req) {
    token = ctx.token;
  } else {
    token = Cookies.get("__session");
  }
  if (token !== "" && token !== undefined) {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const resp = await axios.get(
      "http://localhost:5000/api/v1/board/tasks/all",
      config,
    );
    const tasks = resp.data.tasks;
    return { tasks };
  }
  return;
};

export default withAuth(Board);
