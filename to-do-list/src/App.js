import './App.css';
import React from "react";
import { AppContextProvider } from "./Context";
import RouterComponent from './Router';

/**
 * Главный компонент приложения.
 * Инициализирует контекст с токеном аутентификации и экземплярами API.
 * Отображает основной макет приложения и маршрутизацию.
 * @component
 */
const App = () => {
  return (
    <AppContextProvider>
      <div className="mainLayout">
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
        <RouterComponent />
      </div>
    </AppContextProvider>
  );
};

export { App };
