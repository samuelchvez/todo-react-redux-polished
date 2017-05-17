import { combineReducers } from 'redux';

import * as actionTypes from '../constants/actionTypes';
import * as filterTypes from '../constants/filterTypes';

const createFilterManagerReducer = (filter) => {
  const isFetching = (state = false, action) => {
    let { payload } = action;

    if(payload && payload.filter !== filter) {
      return state;
    }

    switch (action.type){
      case actionTypes.FETCH_TODOS_START:
        return true;
      case actionTypes.FETCH_TODOS_SUCCESS:
      case actionTypes.FETCH_TODOS_ERROR:
        return false;
      default:
        return state;
    }
  }

  const errorMessage = (state = null, action) => {
    let { payload } = action;

    if(payload && payload.filter !== filter) {
      return state;
    }

    switch (action.type) {
      case actionTypes.FETCH_TODOS_START:
      case actionTypes.FETCH_TODOS_SUCCESS:
        return null;
      case actionTypes.FETCH_TODOS_ERROR:
        return payload.reason;
      default:
        return state;
    }
  }

  const cids = (state = [], action) => {
    let { payload } = action;

    switch (action.type) {
      case actionTypes.ADD_TODO:
        return filter !== filterTypes.COMPLETED_FILTER ?
          [...state, action.payload.cid]: state;
      case actionTypes.CONFIRM_TODO:
        return state.filter(cid => cid !== action.payload.cid);
      default:
        return state;
    }
  }

  const ids = (state = [], action) => {
    const { payload } = action;
    let appear;

    switch (action.type) {
      case actionTypes.CONFIRM_TODO:
        const todo = payload.response.entities.todos[payload.response.result];
        appear = (
          (filter === filterTypes.COMPLETED_FILTER && todo.completed) ||
          ((filter === filterTypes.ALL_FILTER || filter === filterTypes.ACTIVE_FILTER) && !todo.completed));

        if(appear && !state.includes(todo.id)) {
          return [...state, todo.id];
        }

        return state;

      case actionTypes.FETCH_TODOS_SUCCESS:
        if(payload && payload.filter !== filter) {
          return state;
        }

        let stateSet = new Set(state);
        let newState = [...state];

        payload.response.result.forEach(id => { 
          if(!stateSet.has(id)) {
            newState.push(id);
          }
        });

        return newState;
      case actionTypes.TOGGLE_TODO:
        const toggledTodo = action.payload;

        const disappear = (
          (filter === filterTypes.ACTIVE_FILTER && toggledTodo.completed) ||
          (filter === filterTypes.COMPLETED_FILTER && !toggledTodo.completed));

        if(disappear) {
          return state.filter(id => id !== toggledTodo.id);
        }

        appear = (
          (filter === filterTypes.ACTIVE_FILTER && !toggledTodo.completed) ||
          (filter === filterTypes.COMPLETED_FILTER && toggledTodo.completed));

        if(appear) {
          return [...state, toggledTodo.id];
        }

      default:
        return state;
    }
  }

  return combineReducers({
    isFetching,
    errorMessage,
    ids,
    cids
  })
}

export default createFilterManagerReducer;

export const getIsFetching = (state) => state.isFetching;
export const getError = (state) => state.errorMessage;
export const getIds = (state) => state.ids;
export const getCids = (state) => state.cids;