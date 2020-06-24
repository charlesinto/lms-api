import mysql from 'mysql2';
import "dotenv/config";

let pool;

if(process.env.NODE_ENV === 'DEVELOPMENT'){
    const {DB_DATABASE_LOCAL, DB_HOST_LOCAL, DB_PASSWORD_LOCAL, DB_USER_LOCAL} = process.env;
    pool = mysql.createPool({
        host: DB_HOST_LOCAL,
        user: DB_USER_LOCAL,
        database: DB_DATABASE_LOCAL,
        password: DB_PASSWORD_LOCAL,
        waitForConnections: true
    })
}else{
    const {DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER} = process.env;
    pool = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        database: DB_DATABASE,
        password: DB_PASSWORD,
        waitForConnections: true
    })
}




export default pool;