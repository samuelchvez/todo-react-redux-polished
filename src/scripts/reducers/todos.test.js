import deepFreeze from 'deep-freeze';

import { addTodo, toggleTodo } from '../actions/todos';
import { todos } from './todos';

describe('todos reducer', () => {
  it('should append a todo with an empty todo list.', () => {
    const stateBefore = [];
    const action = addTodo("example 1");
    const stateAfter = [
      action.payload
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });

  it('should append a todo with a non empty todo list.', () => {
    const stateBefore = [
      {
        id: '0',
        text: "Hola",
        completed: true
      }
    ];
    const action = addTodo("example 1");
    const stateAfter = [
      {
        id: '0',
        text: "Hola",
        completed: true
      },
      action.payload
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });

  it('should toggle an incompleted todo, but not the others.', () => {
    const stateBefore = [
      {
        id: '0',
        text: "Hola",
        completed: true
      },
      {
        id: '1',
        text: "Adios",
        completed: false
      },
      {
        id: '2',
        text: "Cocacola",
        completed: false
      }
    ];

    const action = toggleTodo('1');

    const stateAfter = [
      {
        id: '0',
        text: "Hola",
        completed: true
      },
      {
        id: '1',
        text: "Adios",
        completed: true
      },
      {
        id: '2',
        text: "Cocacola",
        completed: false
      }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  });

  it('should toggle a completed todo, but not the others.', () => {
    const stateBefore = [
      {
        id: '0',
        text: "Hola",
        completed: true
      },
      {
        id: '1',
        text: "Adios",
        completed: true
      },
      {
        id: '2',
        text: "Cocacola",
        completed: false
      }
    ];

    const action = toggleTodo('1');

    const stateAfter = [
      {
        id: '0',
        text: "Hola",
        completed: true
      },
      {
        id: '1',
        text: "Adios",
        completed: false
      },
      {
        id: '2',
        text: "Cocacola",
        completed: false
      }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(todos(stateBefore, action)).toEqual(stateAfter);
  })
});
