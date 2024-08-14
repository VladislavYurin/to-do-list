import './App.css';
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import UserApi from "./api/UserApi";
import ToDoApi from "./api/ToDoApi";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";
import Local from './utils/Local';

/**
 * Контекст для хранения.
 * @typedef {Object} AppContext
 */
const Context = React.createContext({});

/**
 * Главный компонент приложения.
 * Инициализирует контекст с токеном аутентификации и экземплярами API.
 * Отображает основной макет приложения и маршрутизацию.
 * @component
 */
const App = () => {

  const [token, setToken] = useState(Local.getItem("tokenToDoApp"));
  const [todos, setTodos] = useState(Local.getItem("todosToDoApp"));

  const [userApi, setUserApi] = useState(new UserApi(token));
  const [toDoApi, setToDoApi] = useState(new ToDoApi(token));

  const [filter, setFilter] = useState("");

  useEffect(() => {
    setUserApi(new UserApi(token));
    setToDoApi(new ToDoApi(token));
  }, [token])

  useEffect(() => {
    Local.setItem("todosToDoApp", todos, true)
  }, [todos])

  useEffect(() => {
    if (token) {
      toDoApi.getToDos()
        .then(res => res.json())
        .then(data => {
          setTodos(data.todos);
        })
    } else {
      setTodos([]);
    }
  }, [toDoApi, token])

  return (
    <Context.Provider value={{
      token: token,
      todos: todos,
      userApi: userApi,
      toDoApi: toDoApi,
      setToken: setToken,
      setTodos: setTodos,
      filter: filter,
      setFilter: setFilter,
    }}>
      <div className="mainLayout">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <Routes>
          <Route path="" element={token ? <MainPage /> : <AuthPage />} />
        </Routes>
      </div>
    </Context.Provider>
  );
};

export { App, Context };
