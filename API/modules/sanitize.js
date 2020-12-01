const mysql = require("mysql");

/**
 * Sanitizes a string and check for sql injections before using it in an SQL query.
 * @param {string} str 
 * @returns {string | false} the escaped string or false if a potential SQL injection was detected.
 */
function sanitize(str){
    if (typeof str !== 'string') //Not a string (possibly null or undefined)
        return false
    const regex = new RegExp("/'|\"|`|=|--|;/");// Contains ', ", `,=,- or ;
    if (regex.test(str))//Potential SQL injection
        return false
    const escapedStr = mysql.escape(str);
    return escapedStr;
}

module.exports = sanitize;