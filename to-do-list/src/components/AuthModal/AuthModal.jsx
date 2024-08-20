import "./AuthModal.css";
import { useState, useContext } from "react";
import { Context } from "../../Context";
import AlertPopup from "../AlertPopup/AlertPopup";
import useCloseOnOutsideClick from "../../hooks/useCloseModalOnOutsideClick";
import Local from "../../utils/Local";

/**
 * Компонент модального окна авторизации.
 * Позволяет пользователю ввести логин и пароль для авторизации.
 * 
 * @component
 * @param {{setIsAuthPopupOpen: Function}} props - Свойства компонента.
 * @param {Function} props.setIsAuthPopupOpen - Функция для закрытия модального окна.
 */
const AuthModal = ({ setIsAuthPopupOpen }) => {
    const { userApi, setToken, setTodos } = useContext(Context);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [authError, setAuthError] = useState(null);

    useCloseOnOutsideClick(setIsAuthPopupOpen);

    /**
     * Обработчик отправки формы авторизации.
     * Отправляет запрос на сервер для авторизации пользователя и обрабатывает ответ.
     * @param {Event} e - Событие отправки формы.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        userApi.auth({
            login,
            password
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setAuthError(JSON.parse(data.message));
                } else {
                    Local.setItem("tokenToDoApp", data.jwt);
                    Local.setItem("todosToDoApp", data.todos, true)
                    clearForm();
                    setToken(data.jwt);
                    setTodos(data.todos);
                    setIsAuthPopupOpen(false);
                }
            })
            .catch(() => {
                setAuthError("Не удалось подключиться к серверу");
            });
    };

    /**
     * Очищает поля формы и сбрасывает состояние ошибки авторизации.
     */
    const clearForm = () => {
        setLogin("");
        setPassword("");
        setAuthError(null);
    };

    return (
            <div className="popup">
                <form onSubmit={handleSubmit}>
                    <div className="formGroup">
                        <label htmlFor="login">Логин:</label>
                        <input
                            type="text"
                            id="login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            className="formControl"
                        />
                    </div>

                    <div className="formGroup">
                        <label htmlFor="password">Пароль:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="formControl"
                        />
                    </div>
                    {authError && <AlertPopup error={authError} />}
                    <button className="mainButton" type="submit">Авторизация</button>
                </form>
            </div>
    );
};

export default AuthModal;