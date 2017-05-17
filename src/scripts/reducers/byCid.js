import * as actionTypes from '../constants/actionTypes';

const byCid = (state = {}, action) => {
  let newState;

  switch (action.type) {
    case actionTypes.ADD_TODO:
    case actionTypes.TOGGLE_TODO:
      return {
        ...state,
        [action.payload.cid]: action.payload
      };
    // case actionTypes.CONFIRM_TODO:
    //   newState = { ...state };
    //   const { 'payload': { cid } } = action;
    //   delete newState[cid];
    //   return newState;
    case actionTypes.FETCH_TODOS_SUCCESS:
      const { 'payload': { 'response': { entities, result } }} = action;
      newState = { ...state };
      result.forEach(
        id => {
          const todo = entities.todos[id];
          newState[todo.cid] = todo
        });
      return newState;
    default:
      return state;
  }
}

export default byCid;

export const getTodo = (state, id) => state[id];