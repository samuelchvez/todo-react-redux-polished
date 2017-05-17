import React from 'react';

export const TodoItem = ({ children, completed, blocked, onClick }) => (
  <li
    className={
      "todo-item " +
      (completed ? "completed": "") +
      (blocked ? "blocked": "") }
    onClick={ () => { if(!blocked) { onClick(); } } }>{ children }
  </li>
);

export const TodoList = ({ todos, onTodoClicked }) => (
  <ul class="todo-list">
    {
      todos.map(todo => (
        <TodoItem
          key={ todo.cid }
          { ...todo }
          onClick={ () => onTodoClicked(todo.id) }>
          { todo.text }
        </TodoItem>
      ))
    }
  </ul>
);