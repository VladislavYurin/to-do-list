import "./ToDoCard.css";
import useToDoActions from "../../hooks/useToDoService";

const ToDoCard = ({ todo }) => {

    const { handleDelete, handleComplete } = useToDoActions({ todo });

    let borderColor;
    switch (todo.priority) {
        case 'high':
            borderColor = '#00FFFF'; // Циан
            break;
        case 'medium':
            borderColor = '#FFFF00'; // Желтый
            break;
        case 'low':
            borderColor = '#00FF00';// Зеленый
            break;
        default:
            borderColor = 'transparent'; // Прозрачная граница, если приоритет неизвестен
    }

    const createdAt = new Date(todo.createdAt).toLocaleString('ru-Ru', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
    const dueDate = new Date(todo.dueDate).toLocaleString('ru-Ru', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });


    return (
        <div className='toDoCardContainer' style={{ borderColor: borderColor, borderWidth: '2px', borderStyle: 'solid' }}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <p><strong>Создано:</strong> {createdAt}</p>
            <p><strong>Срок исполнения:</strong> {dueDate}</p>
            <div className='toDoButtonContainer'>
                <button className="mainButton" onClick={handleDelete}>Удалить задачу</button>
                <button className="mainButton" onClick={handleComplete} disabled={todo.completed}>{todo.completed ? 'Выполнено' : 'Выполнить задачу'}</button>
            </div>
        </div>
    );
};

export default ToDoCard;