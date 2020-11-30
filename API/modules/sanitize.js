const mysql = require("mysql");

/**
 * Sanitizes a string and check for sql injections before using it in an SQL query.
 * @param {string} str 
 * @returns {string | false} the escaped string or false if a potential SQL injection was detected.
 */
function sanitize(str){
    if (str.includes(";") || str.includes("=") || str.includes("--")) //Possible SQL injection
         return false;
    const escapedStr = mysql.escape(str);
    return escapedStr;
}

module.exports = sanitize;