
const sql = require('mysql2');
require('dotenv').config();

const connection = sql.createConnection(
    {
        host: '127.0.0.1',
        multipleStatements: true,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
);

module.exports = connection;