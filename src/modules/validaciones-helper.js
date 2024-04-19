class ValidacionesHelper {
    getIntegerOrDefault = (value, defaultValue) => {
        return parseInt(value)||defaultValue
    };
    /**
    * Este método recibe un 'value', en el caso de que sea undefined o null
    * retorna el 'defaultValue', sino el valor del parámetro 'value'.
    * @param {*} value valor a verificar.
    * @param {*} defaultValue valor por default en el caso de que 'value' sea
    * undefined o null.
    * @returns Un número entero.
    *
    * @example
    * let variable;
    * let result1 = ValidacionesHelper.getStringOrDefault("10", ""); // returns: "10"
    * let result2 = ValidacionesHelper.getStringOrDefault(null, "TEST"); // returns: "TEST"
    * let result3 = ValidacionesHelper.getStringOrDefault(variable, "TEST"); // returns: "TEST"
    */
    getStringOrDefault = (value, defaultValue) => {
        return value || defaultValue;
    };
    }
    // Exporto todo lo que yo quiero exponer del módulo:
    export default new ValidacionesHelper();