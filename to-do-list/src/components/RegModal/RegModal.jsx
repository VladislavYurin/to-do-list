import "./RegModal.css";
import { useState, useContext } from "react";
import { Context } from "../../App";
import AlertPopup from "../AlertPopup/AlertPopup";
import useCloseOnOutsideClick from "../../hooks/useCloseModalOnOutsideClick";

/**
 * Компонент модального окна регистрации пользователя.
 * Предоставляет форму для ввода данных нового пользователя и отправки их на сервер.
 * Использует контекст приложения для доступа к API пользователя и управления токеном аутентификации.
 * Также использует хук для закрытия модального окна при клике вне его области.
 * 
 * @component
 * @param {Object} props - Свойства компонента.
 * @param {(boolean) => void} props.setIsRegPopupOpen - Функция для управления видимостью модального окна регистрации.
 */
const RegModal = ({ setIsRegPopupOpen }) => {
    const { userApi, setToken } = useContext(Context);

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [repeatPassword, setRepeatPassword] = useState("");
    const [email, setEmail] = useState("");

    const [regError, setRegError] = useState(null);

    useCloseOnOutsideClick(setIsRegPopupOpen);

    /**
     * Обработчик отправки формы регистрации.
     * Отправляет запрос на сервер для регистрации пользователя и обрабатывает ответ.
     * @param {Event} e - Событие отправки формы.
     */
    const handleSubmit = (e) => {
        e.preventDefault();

        if (password !== repeatPassword) {
            setRegError("Пароли не совпадают");
            return;
        }

        userApi.reg({
            login,
            password,
            email
        })
            .then(res => res.json())
            .then(data => {
                if (data.message) {
                    setRegError(data.message);
                } else {
                    clearForm();
                    setToken(data.token);
                    setIsRegPopupOpen(false);
                }
            })
            .catch(() => {
                setRegError("Не удалось подключиться к серверу");
            });

    };

    /**
     * Очищает поля формы и сбрасывает состояние ошибки регистрации.
     */
    const clearForm = () => {
        setLogin("");
        setPassword("");
        setRepeatPassword("");
        setEmail("");
        setRegError(null);
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

                <div className="formGroup">
                    <label htmlFor="repeatPassword">Пароль:</label>
                    <input
                        type="password"
                        id="repeatPassword"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        required
                        className="formControl"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="formControl"
                    />
                </div>
                {regError && <AlertPopup error={regError} />}
                <button className="mainButton" type="submit">Регистрация</button>
            </form>
        </div>
    )
};

export default RegModal;