import { combineReducers } from 'redux';
import { createSelector } from 'reselect';

import byId from './byId';
import byCid from './byCid';
import filterManagers from './filterManagers';
import * as filterTypes from '../constants/filterTypes';
import * as fromFilterManagers from './filterManagers';
import * as fromById from './byId';
import * as fromByCid from './byCid';

const todos = combineReducers({
  byCid,
  byId,
  filterManagers
});

export default todos;

export const getFilterManagers = state => state.filterManagers;

export const getVisibleTodos = (state, filter) =>
  fromFilterManagers.getIds(state.filterManagers, filter).map(
      id => fromById.getTodo(state.byId, id));

export const getVisibleUnconfirmedTodos = (state, filter) =>
  fromFilterManagers.getCids(state.filterManagers, filter).map(
      id => fromByCid.getTodo(state.byCid, id));

export const getIsFetching = (state, filter) =>
  fromFilterManagers.getIsFetching(state.filterManagers, filter);

export const getTodoById = (state, id) => fromById.getTodo(state.byId, id);

export const getTodoByCid = (state, id) => fromByCid.getTodo(state.byCid, id);

export const getError = (state, filter) =>
  fromFilterManagers.getError(state.filterManagers, filter);
