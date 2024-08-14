import { useState, useContext, useEffect } from "react";
import { Context } from "../../App";
import CreateToDoModal from "../../components/CreateToDoModal/CreateToDoModal";
import ToDoCard from "../../components/ToDoCard/ToDoCard";
import "./MainPage.css";
import Local from '../../utils/Local';

/**
 * Компонент основной страницы.
 * Отображает панель управления и карточки с todo.
 * 
 * @component
 */
const MainPage = () => {
    const { todos, setToken, setTodos, filter, setFilter } = useContext(Context);

    /**
    * Состояние для отображения модального окна создания todo.
    */
    const [isCreateTodoPopupOpen, setIsCreateTodoPopupOpen] = useState(false);

    /**
     * Обработчик клика по кнопке "Создать задачу".
     * Открывает модальное окно создания задачи.
     */
    const handleCreateTodoClick = () => setIsCreateTodoPopupOpen(true);


    /**
     * Обработчик клика по кнопке "Выйти".
     * Удаляет токен, происходит выход из профиля.
     */
    const handleLogoutClick = () => {
        setToken();
        setTodos([]);
        Local.setItem("todosToDoApp", "");
        Local.setItem("tokenToDoApp", "");
    }

    useEffect(() => {
        let sortedTodos = [...todos];
        switch (filter) {
            case "priority":
                sortedTodos.sort((a, b) => {
                    const priorities = ["low", "medium", "high"];
                    return priorities.indexOf(a.priority) - priorities.indexOf(b.priority);
                });
                break;
            case "dueDate":
                sortedTodos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
                break;
            default:
                sortedTodos.sort((a, b) => a.id - b.id);
        }
        setTodos(sortedTodos);
    }, [filter]);

    return (
        <div className="mainPageContainer">
            <div className="utilsContainer">
                <button className="mainButton" onClick={handleCreateTodoClick}>+ Создать задачу</button>
                <div className="filterButtons">
                    <button className="mainButton" onClick={() => setFilter("priority")} disabled={filter === "priority"}> #Приоритетные </button>
                    <button className="mainButton" onClick={() => setFilter("dueDate")} disabled={filter === "dueDate"}> #Срочные </button>
                    <button className="mainButton" onClick={() => setFilter("")} disabled={filter === ""}> Сброс </button>
                </div>
                <button className="mainButton exitButton" onClick={handleLogoutClick}>Выйти</button>
            </div>

            <div className="todosContainer">
                {todos.map((todo) => {
                    return <ToDoCard
                        key={todo.id}
                        todo={todo}
                    />
                })}
            </div>

            {isCreateTodoPopupOpen && <CreateToDoModal setIsCreateTodoPopupOpen={setIsCreateTodoPopupOpen} />}
        </div>
    )
};

export default MainPage;