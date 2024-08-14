import './AlertPopup.css';

/**
 * Компонент для отображения сообщений об ошибках или предупреждений.
 * Отображает текстовое сообщение внутри блока с заданными стилями.
 * Компонент не рендерится, если пропс error отсутствует или пустой.
 *
 * @component
 * @param {Object} props - Объект свойств компонента.
 * @param {string} props.error - Текстовое сообщение об ошибке для отображения. Если отсутствует или пустая строка, компонент не рендерится.
 */
const AlertPopup = ({ error }) => {
    if (!error) {
        return null;
    }

    return (
        <div className="alertPopup">
            {error}
        </div>
    );
};

export default AlertPopup;