import React from 'react';

import { connect } from 'react-redux';
import { addTodo } from '../actions';

let AddTodo = ({ dispatch }) => {
  let input = "";

  const addTodoEventHandler = () => {
    dispatch(addTodo(input.value));
    input.value = "";
    input.focus();
  }

  return (
    <div className="add-todo">
      <div class="input-wrapper component-position-right clear-margin">
        <input
          type="text"
          ref={(node) => {input = node;}}
          onKeyPress={
            (e) => {
              if (e.key === 'Enter') {
                addTodoEventHandler();
              }
            }
          } />
        <button
          class="button button-small button-primary"
          onClick={ () => { addTodoEventHandler() } }>
          Add</button>
      </div>
    </div>
  );
}

AddTodo = connect()(AddTodo);

export default AddTodo;