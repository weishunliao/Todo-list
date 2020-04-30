import {
  INPUT_CHANGE,
  ADD_NEW_TASK,
  INITIAL_TASK,
  DELETE_TASK,
} from "../constants/boardConstants";

const defaultState = {
  inputValue: "",
};

export const boardReducer = (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state));
  switch (action.type) {
    case INPUT_CHANGE:
      return { ...state, inputValue: action.value };
    case INITIAL_TASK:
      return { ...state, items: action.value };
    case ADD_NEW_TASK:
      newState.items.push(action.value);
      return newState;
    case DELETE_TASK:
      let items = newState.items.filter((task) => task._id !== action.value);
      newState.items = items;
      return newState;
    default:
      return state;
  }
};
