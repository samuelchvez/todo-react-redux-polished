import { schema, arrayOf } from 'normalizr';

export const todo = new schema.Entity('todos');
export const unconfirmedTodo = new schema.Entity('todos', {
  idAttribute: article => article.cid
});
export const arrayOfTodos = new schema.Array(todo);