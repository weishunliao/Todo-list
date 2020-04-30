import {
  INPUT_CHANGE,
  ADD_NEW_TASK,
  INITIAL_TASK,
  DELETE_TASK,
} from "../constants/boardConstants";
import axios from "axios";

export const handleInputChangeAction = (newValue) => {
  return {
    type: INPUT_CHANGE,
    value: newValue,
  };
};

export const handleInitialItemAction = (newValue) => {
  return {
    type: INITIAL_TASK,
    value: newValue,
  };
};

export const handleDeleteTaskAction = (taskId) => {
  return async (dispatch) => {
    await axios.post("http://localhost:5000/api/v1/board/task/" + taskId);
    dispatch({
      type: DELETE_TASK,
      value: taskId,
    });
  };
};

export const handleAddNewTaskAction = (task) => {
  return async (dispatch) => {
    const resp = await axios.post("http://localhost:5000/api/v1/board/task", {
      content: task,
    });
    dispatch({
      type: ADD_NEW_TASK,
      value: resp.data,
    });
  };
};
