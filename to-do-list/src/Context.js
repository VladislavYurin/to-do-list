import React, { createContext, useState, useEffect } from "react";
import UserApi from "./api/UserApi";
import ToDoApi from "./api/ToDoApi";
import Local from './utils/Local';

export const Context = createContext();

export const AppContextProvider = ({ children }) => {
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
            {children}
        </Context.Provider>
    );
};