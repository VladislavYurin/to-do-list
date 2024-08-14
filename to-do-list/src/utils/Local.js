/**
 * Класс Local предоставляет статические методы для работы с localStorage.
 */
class Local {
    /**
     * Получает данные из localStorage по имени.
     * @param {string} name - Имя данных в localStorage.
     * @param {boolean} [flag=false] - Флаг указывающий на необходимость парсинга данных как JSON.
     * @returns {*} Возвращает данные из localStorage или пустую строку, если данные отсутствуют.
     */
    static getItem(name, flag = true) {
        let data = localStorage.getItem(name);
        if (data) {
            if (flag) {
                return JSON.parse(data);
            } else {
                return data;
            }
        }
        return "";
    }

    /**
     * Сохраняет данные в localStorage под заданным именем.
     * @param {string} name - Имя, под которым будут сохранены данные.
     * @param {*} data - Данные для сохранения.
     * @param {boolean} [flag=false] - Флаг указывающий на необходимость сериализации данных в JSON перед сохранением.
     */
    static setItem(name, data, flag = true) {
        if (flag) {
            localStorage.setItem(name, JSON.stringify(data));
        } else {
            localStorage.setItem(name, data);
        }
    }
}

export default Local;