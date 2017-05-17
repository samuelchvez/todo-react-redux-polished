import React from 'react';

import { ALL_FILTER } from '../constants/filterTypes';
import Tabs from './tabs';
import AddTodo from './addTodo';
import VisibleTodoList from './visibleTodosList';

const App = () => (
  <div>
    <Tabs />
    <VisibleTodoList />
    <AddTodo />
  </div>
);

export default App;