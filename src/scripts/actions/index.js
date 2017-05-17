import uuid from 'uuid-v4';
import { normalize } from 'normalizr';

import * as api from '../api';
import * as actionTypes from '../constants/actionTypes';
import * as schemas from '../schemas';

import { getIsFetching, getTodoById } from '../reducers';

export const addTodo = text => dispatch => {
  let cid = uuid();

  api.addTodo(text).then(
    todo => dispatch({
      type: actionTypes.CONFIRM_TODO,
      payload: {
        cid,
        response: normalize(
          { ...todo, cid },
          schemas.todo)
      }
    })
  );

  return dispatch({
    type: actionTypes.ADD_TODO,
      payload: {
        cid,
        text,
        completed: false
      }
  });
};

export const toggleTodo = id =>
  (dispatch, getState) => {
    const toggledTodo = getTodoById(getState(), id);
    const { cid } = toggledTodo;

    api.toggleTodo(id).then(
      todo => dispatch({
        type: actionTypes.CONFIRM_TODO,
        payload: {
          cid,
          response: normalize({
            ...todo,
            cid: toggledTodo.cid
          }, schemas.todo)
        }
      })
    );

    return dispatch({
      type: actionTypes.TOGGLE_TODO,
        payload: toggledTodo
    });
  };

export const fetchTodos = (filter) => 
  (dispatch, getState) => {
    if(getIsFetching(getState(), filter)) {
      return Promise.resolve();
    }

    dispatch({
      type: actionTypes.FETCH_TODOS_START,
      payload: {
        filter
      }
    });

    return api.fetchTodos(filter).then(
      todos => dispatch({
        type: actionTypes.FETCH_TODOS_SUCCESS,
        payload: {
          filter,
          response: normalize(
            todos.map(todo => ({ cid: uuid(), ...todo })),
            schemas.arrayOfTodos),
        }
      }),
      reason => dispatch({
        type: actionTypes.FETCH_TODOS_ERROR,
        payload: {
          filter,
          reason: reason.message,
        }
      })
    );
}
