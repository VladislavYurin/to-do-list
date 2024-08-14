import useCloseOnOutsideClick from "../../hooks/useCloseModalOnOutsideClick";
import "./CreateToDoModal.css";
import { useState } from "react";
import AlertPopup from "../AlertPopup/AlertPopup";
import useToDoActions from "../../hooks/useToDoService";

const CreateToDoModal = ({ setIsCreateTodoPopupOpen }) => {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState();
    const [priority, setPriority] = useState();
    const [createToDoError, setCreateToDoError] = useState(null);

    useCloseOnOutsideClick(setIsCreateTodoPopupOpen);

    const { handleCreate } = useToDoActions({
        "id": null,
        "title": title,
        "description": description,
        "completed": false,
        "dueDate": dueDate,
        "priority": priority,
        "createdAt": new Date().toISOString(),
    }, setCreateToDoError);

    return (
        <div className="popup" >
            <form onSubmit={handleCreate}>
                <div className="formGroup">
                    <label htmlFor="title">Краткое описание:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="formControl"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="description">Полное описание:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="formControl"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="dueDate">Срок:</label>
                    <input
                        type="datetime-local"
                        id="dueDate"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                        className="formControl"
                    />
                </div>

                <div className="formGroup">
                    <label htmlFor="priority">Приоритет:</label>
                    <select
                        id="priority"
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        required
                        className="formControl"
                    >
                        <option value="low">Низкий</option>
                        <option value="middle">Средний</option>
                        <option value="high">Высокий</option>
                    </select>
                </div>

                {createToDoError && <AlertPopup error={createToDoError} />}

                <button className="mainButton" type="submit">Создать</button>
            </form>
        </div >
    );
};

export default CreateToDoModal;