import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./Context";
import AuthPage from "./pages/AuthPage/AuthPage";
import MainPage from "./pages/MainPage/MainPage";

const RouterComponent = () => {
    const { token } = useContext(Context);

    return (
        <Routes>
            <Route path="" element={token ? <MainPage /> : <AuthPage />} />
        </Routes>
    );
};

export default RouterComponent;