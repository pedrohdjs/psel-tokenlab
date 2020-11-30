//Classe wrapper para a conexão com o banco de dados
const mysql = require("mysql");
const util = require("util");

class dbConnection{
    HOST = '127.0.0.1';
    DATABASE = 'psel-tokenlab';
    USER = "root";
    PASSWORD = "";

    constructor(){
        this.connection = mysql.createConnection({host: this.HOST,
                                                  database: this.DATABASE,
                                                  user: this.USER, 
                                                  password: this.PASSWORD});
        this.connection.connect((err) => {
            if(err){
                console.log("Connection failed: " + err.stack);
                return;
            }
            else {
                console.log('Connection successful! Connected as id ' + this.connection.threadId)
            }
        })
    }

    /**
     * Perform the given SQL query, and close the connection.
     * queryString must be sanitized before passed as an argument.
     * @param {string} queryString 
     * @returns {Promise<array | false>} an array with the results, if they are found, or false, if something goes wrong.
     */
    async query(queryString){
        const query =  util.promisify(this.connection.query).bind(this.connection);
        let res;
        try{
            res = await query(queryString);
        }
        catch (e) {
            console.log(e);
            res = false;
        }
        finally{
            const end = util.promisify(this.connection.end).bind(this.connection);
            await end();
        }
        return res;
    }

    /**
     * Tries to close the database connection, if it is still open.
     * If it is already close, the function does nothing.
     * @returns {Promise<void>}
     */
    async close(){
        try{
            const end = util.promisify(this.connection.end).bind(this.connection);
            await end();    
        }
        finally{
            return;
        }
    }
}

module.exports = dbConnection;