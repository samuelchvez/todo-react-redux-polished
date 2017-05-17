import React from 'react';
import {
    ALL_FILTER,
    COMPLETED_FILTER,
    ACTIVE_FILTER } from '../constants/filterTypes';

import FilterLink from './filterLink';

const Tabs = () => (
  <div className="buttons three">
    <FilterLink filter={ ALL_FILTER }>all</FilterLink>
    <FilterLink filter={ COMPLETED_FILTER }>completed</FilterLink>
    <FilterLink filter={ ACTIVE_FILTER }>active</FilterLink>
  </div>
);

export default Tabs;