import React from 'react';
import { Link, withRouter } from 'react-router';
import { ALL_FILTER } from '../constants/filterTypes';

const FilterLink = ({ filter, children }) => (
  <Link
    className="button"
    activeClassName="button-gray selected"
    to={ "/" + (filter === ALL_FILTER ? '' : filter) }
    >{ children }</Link>
);

export default FilterLink;