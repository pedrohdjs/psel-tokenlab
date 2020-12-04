//Classe wrapper para a conexão com o banco de dados
const mysql = require("mysql");
const util = require("util");

class DbConnection{
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
                console.log("Database connection failed: " + err.stack);
                return;
            }
            else {
                console.log('Database connection successful! Connected as id ' + this.connection.threadId)
            }
        })
    }

    /**
     * Perform the given SQL query, and close the connection.
     * queryString must be sanitized before passed as an argument.
     * @param {string} queryString 
     * @returns {Promise<array | false>} an array with the results, if they are found, or false, if there are no results or the query fails.
     */
    async query(queryString){
        const query =  util.promisify(this.connection.query).bind(this.connection);
        let res;
        try{
            res = await query(queryString);
        }
        catch (e) {
            //console.log(e); //debug
            res = false;
        }
        finally{
            this.connection.end();
        }
        if(Array.isArray(res)){
            if(res.length <= 0)
                res = false;
        }
        return res;
    }

    /**
     * Tries to close the database connection, if it is still open.
     * If it is already close, the function does nothing.
     * @returns {Promise<void>}
     */
    close(){
        try{
            this.connection.end();    
        }
        finally{
            return;
        }
    }
}

module.exports = DbConnection;