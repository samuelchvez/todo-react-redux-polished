import * as actionTypes from '../constants/actionTypes';

const byId = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CONFIRM_TODO:
      const {'payload': { response }} = action;
      const todo = response.entities.todos[response.result];

      return {
        ...state,
        [todo.id]: todo
      };

    case actionTypes.TOGGLE_TODO:
      const { id } = action.payload;
      const newState = { ...state };
      newState[id].completed = !newState[id].completed;
      return newState;

    case actionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        ...action.payload.response.entities.todos };
    default:
      return state;
  }
}

export default byId;

export const getTodo = (state, id) => state[id];