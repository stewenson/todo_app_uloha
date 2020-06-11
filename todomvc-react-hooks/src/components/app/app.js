import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { onLoad } from '../../store/actions/todo';
import { TodoLocal } from '../../services/todo-local';
import { Header } from '../header/header';
import { List } from '../list/list';
import { Filter } from '../filter/filter';
import { CopyRight } from '../copy-right/copy-right';

export function App() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(onLoad(TodoLocal.loadTodos()));
  }, [dispatch]);

  useEffect(() => {
    TodoLocal.storeTodos(todos);
  }, [todos]);

  return (
    <div id="app">
      <section className="todoapp">
          {!!todos.length && <Filter />}
          <Header />
          {!!todos.length && <List />}
      </section>
      <CopyRight />
    </div>
  );
}
