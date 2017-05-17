import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import * as filterTypes from '../constants/filterTypes';
import * as actionCreators from '../actions';

import {
  getVisibleTodos,
  getIsFetching,
  getError,
  getVisibleUnconfirmedTodos } from '../reducers';
import { TodoList } from './todos';
import Loader from './loader';
import RefetchTodos from './refetchTodos';

class VisibleTodoList extends React.Component {

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    let { filter } = this.props;

    if(prevProps.filter !== filter){
      this.fetchData();
    }
  }

  fetchData() {
    let { fetchTodos, filter } = this.props;
    fetchTodos(filter);
  }

  render() {
    let {
      todos,
      unconfirmedTodos,
      toggleTodo,
      isFetching,
      errorMessage } = this.props;

    if(!todos.length) {
      if(isFetching){
        return <Loader />;
      }
      else if(errorMessage) {
        return <RefetchTodos
          message={ errorMessage }
          refetch={ () => this.fetchData() } />;
      }
    }

    return <div>
      <TodoList
        todos={ todos }
        onTodoClicked={ toggleTodo } />
      <TodoList
        todos={ unconfirmedTodos.map(todo => ({
          ...todo,
          blocked: true
        })) }
        onTodoClicked={ toggleTodo } />
    </div>;
  }
}

const mapStateToProps = (state, { params }) => {
  const filter = params.filter ? params.filter: filterTypes.ALL_FILTER;

  return {
    isFetching: getIsFetching(state, filter),
    errorMessage: getError(state, filter),
    todos: getVisibleTodos(state, filter),
    unconfirmedTodos: getVisibleUnconfirmedTodos(state, filter),
    filter
  };
};

VisibleTodoList = withRouter(
  connect(
    mapStateToProps,
    { ...actionCreators }
  )(VisibleTodoList)
);

export default VisibleTodoList;