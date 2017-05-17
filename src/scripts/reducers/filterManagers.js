import { combineReducers } from 'redux';

import * as filterTypes from '../constants/filterTypes';
import * as actionTypes from '../constants/actionTypes';

import createFilterManagerReducer, * as fromCreateFilterManager from './createFilterManager';

const filterManagers = combineReducers({
  [filterTypes.ALL_FILTER]: createFilterManagerReducer(filterTypes.ALL_FILTER),
  [filterTypes.ACTIVE_FILTER]: createFilterManagerReducer(filterTypes.ACTIVE_FILTER),
  [filterTypes.COMPLETED_FILTER]: createFilterManagerReducer(filterTypes.COMPLETED_FILTER),
});

export default filterManagers;

export const getFilterManager = (state, filter) => state[filter];

export const getIds = (state, filter) => 
  fromCreateFilterManager.getIds(state[filter]);

export const getCids = (state, filter) => 
  fromCreateFilterManager.getCids(state[filter]);

export const getIsFetching = (state, filter) => 
  fromCreateFilterManager.getIsFetching(state[filter]);

export const getError = (state, filter) => 
  fromCreateFilterManager.getError(state[filter]);
