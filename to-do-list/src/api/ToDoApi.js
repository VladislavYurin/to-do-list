/**
 * Класс для работы с API задач (to-do items).
 * Предоставляет методы для получения, обновления, удаления и добавления задач.
 * 
 * @class
 * @example
 * const todoApi = new ToDoApi("your_token_here");
 * todoApi.getToDos().then(response => console.log(response));
 */
class ToDoApi {
    /**
     * Создает экземпляр ToDoApi.
     * 
     * @constructor
     * @param {string} token - Токен для доступа к API.
     */
    constructor(token){
        this.path = "http://localhost:8080/todo";
        this.token = token;
    }

    /**
     * Получает список всех задач.
     * Отправляет GET-запрос на сервер для получения списка всех задач.
     * 
     * @returns {Promise} Возвращает промис с ответом сервера.
     */
    getToDos(){
        return fetch(`${this.path}/getAll`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    /**
     * Получает информацию о конкретной задаче по её ID.
     * Отправляет GET-запрос на сервер для получения информации о задаче.
     * 
     * @param {string} id - ID задачи.
     * @returns {Promise} Возвращает промис с ответом сервера.
     */
    getToDo(id){
        return fetch(`${this.path}/${id}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    /**
     * Обновляет информацию о задаче по её ID.
     * Отправляет PATCH-запрос на сервер для обновления информации о задаче.
     * 
     * @param {string} id - ID задачи.
     * @param {Object} body - Объект с новыми данными задачи.
     * @returns {Promise} Возвращает промис с ответом сервера.
     */
    updToDo(id, body){
        return fetch(`${this.path}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        });
    }

    /**
     * Удаляет задачу по её ID.
     * Отправляет DELETE-запрос на сервер для удаления задачи.
     * 
     * @param {string} id - ID задачи.
     * @returns {Promise} Возвращает промис с ответом сервера.
     */
    deleteToDo(id){
        return fetch(`${this.path}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.token}`
            }
        });
    }

    /**
     * Добавляет новую задачу.
     * Отправляет POST-запрос на сервер для добавления новой задачи.
     * 
     * @param {Object} body - Объект с данными новой задачи.
     * @returns {Promise} Возвращает промис с ответом сервера.
     */
    addToDo(body){
        return fetch(`${this.path}/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${this.token}`
            },
            body: JSON.stringify(body)
        });
    }
}

export default ToDoApi;