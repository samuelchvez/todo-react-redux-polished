import React from 'react';

const RefetchTodos = ({ message, refetch }) => (
  <div className="refetch-todos center-text">
    <span className="message">{ message }</span>
    <a className="button button-danger button-tiny" onClick={ refetch }>
      <i className="fa fa-reload"></i> <span className="text">Try again</span>
    </a>
  </div>
);

export default RefetchTodos;