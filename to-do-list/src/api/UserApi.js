/**
 * Класс для работы с API пользователя.
 * Предоставляет методы для аутентификации и регистрации пользователя.
 * 
 * @class
 * @example
 * const userApi = new UserApi("your_token_here");
 * userApi.auth({username: "test", password: "12345"});
 */
class UserApi {
    /**
     * Создает экземпляр UserApi.
     * 
     * @constructor
     * @param {string} token - Токен для доступа к API.
     */
    constructor(token){
        this.path = "http://localhost:8080/user";
        this.token = token;
    }

    /**
     * Метод аутентификации пользователя.
     * Отправляет запрос на сервер для аутентификации пользователя.
     * 
     * @param {Object} body - Объект с данными пользователя для аутентификации.
     * @returns {Promise} Возвращает промис с ответом сервера.
     */
    auth(body){
        return fetch(`${this.path}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    /**
     * Метод регистрации пользователя.
     * Отправляет запрос на сервер для регистрации нового пользователя.
     * 
     * @param {Object} body - Объект с данными пользователя для регистрации.
     * @returns {Promise} Возвращает промис с ответом сервера.
     */
    reg(body) {
        return fetch(`${this.path}/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
}

export default UserApi;