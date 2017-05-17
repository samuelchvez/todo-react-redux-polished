import uuid from 'uuid-v4';

import * as filterTypes from './constants/filterTypes';

const delay = ms => new Promise((resolve, reject) => setTimeout(resolve, ms));

const SIM_NETWORK_DELAY = 2000;

const inMemoryTodos = [
  {
    id: uuid(),
    completed: false,
    text: 'Hey'
  },
  {
    id: uuid(),
    completed: true,
    text: 'Ho'
  },
  {
    id: uuid(),
    completed: false,
    text: 'Lets go'
  },
]

export const fetchTodos = filter => delay(SIM_NETWORK_DELAY).then(() => {
  // if(Math.random() > 0.5) {
  //   throw new Error("Could not fetch Todos.");
  // }

  switch(filter) {
    case filterTypes.ALL_FILTER:
      return inMemoryTodos;
    case filterTypes.COMPLETED_FILTER:
      return inMemoryTodos.filter(t => t.completed);
    case filterTypes.ACTIVE_FILTER:
      return inMemoryTodos.filter(t => !t.completed);
    default:
      return [];
  }
});

export const addTodo = text => delay(SIM_NETWORK_DELAY).then(() => {
  const todo = {
    id: uuid(),
    text,
    completed: false
  };

  inMemoryTodos.push(todo);
  return todo;
});

export const toggleTodo = id => delay(SIM_NETWORK_DELAY).then(() => {
  const found = inMemoryTodos.find(todo => todo.id === id);

  if((typeof found) === 'undefined') {
    throw new Error(`Todo ${id} not found.`);
  }

  found.completed = !found.completed;

  return found;
});
