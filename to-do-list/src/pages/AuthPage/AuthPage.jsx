import { useState } from "react";
import AuthModal from "../../components/AuthModal/AuthModal";
import RegModal from "../../components/RegModal/RegModal";
import './AuthPage.css';

/**
 * Компонент страницы авторизации.
 * Отображает кнопки для открытия модальных окон авторизации и регистрации.
 * 
 * @component
 */
const AuthPage = () => {

    /**
     * Состояние для отображения модального окна авторизации.
     */
    const [isAuthPopupOpen, setIsAuthPopupOpen] = useState(false);

    /**
     * Состояние для отображения модального окна регистрации.
     */
    const [isRegPopupOpen, setIsRegPopupOpen] = useState(false);

    /**
     * Обработчик клика по кнопке "Авторизация".
     * Открывает модальное окно авторизации.
     */
    const handleAuthClick = () => setIsAuthPopupOpen(true);

    /**
     * Обработчик клика по кнопке "Регистрация".
     * Открывает модальное окно регистрации.
     */
    const handleRegClick = () => setIsRegPopupOpen(true);

    return (
        <div className="authPageContainer">
            <div className="authPageMainOption">
                <button className="mainButton" onClick={handleAuthClick}>
                    Авторизация
                </button>
                <button className="mainButton" onClick={handleRegClick}>
                    Регистрация
                </button>
            </div>
            {isAuthPopupOpen && <AuthModal setIsAuthPopupOpen={setIsAuthPopupOpen} />}
            {isRegPopupOpen && <RegModal setIsRegPopupOpen={setIsRegPopupOpen} />}
        </div>
    );
}

export default AuthPage;