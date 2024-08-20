import { useContext } from "react";
import { Context } from "../Context";

/**
 * Кастомный хук для работы с задачами (to-do items).
 *
 * @param {{ todo }} - Объект с данными задачи, необходимыми для выполнения действий над ней.
 * @param {function} setStateError - Функция для установки текста ошибки.
 *
 * @returns {Object} Объект с методами для выполнения действий над задачами.
 */
const useToDoActions = ({ todo }, setStateError) => {
    const { toDoApi, todos, setTodos } = useContext(Context);

    /**
     * Удаляет задачу по ID.
     * @param {Event} e - Событие отправки формы.
     */
    const handleDelete = (e) => {
        e.preventDefault();

        toDoApi.deleteToDo(todo.id)
            .then(res => {
                if (!res.ok) {
                    alert("Что-то пошло не так.");
                } else {
                    const updatedTodos = todos.filter(item => item.id !== todo.id);
                    setTodos(updatedTodos);
                }
            })
    };

    /**
     * Завершает задачу по ID.
     * @param {Event} e - Событие отправки формы.
     */
    const handleComplete = (e) => {
        e.preventDefault();

        toDoApi.updToDo(todo.id, { "completed": true })
            .then(res => {
                if (!res.ok) {
                    alert("Что-то пошло не так.");
                } else {
                    const updatedTodos = todos.map(item =>
                        item.id === todo.id ? { ...item, completed: !todo.completed } : item
                    );
                    setTodos(updatedTodos);
                }
            })
    };

    /**
     * Создает новую задачу.
     * @param {Event} e - Событие отправки формы.
     */
    const handleCreate = (e) => {
        e.preventDefault();

        toDoApi.addToDo({ todo })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Что-то пошло не так.");
                } else { return res.json() }
            })
            .then(data => {
                const updatedTodos = [...todos, data];
                setTodos(updatedTodos);
            })
            .catch(error => setStateError(error.message));
    };

    return { handleDelete, handleComplete, handleCreate };
};

export default useToDoActions;