// configurar mi base de datos con mssql

const mssql = require('mssql');

const config = {
    user: 'sa',
    password: '123456',
    server: 'localhost',
    database: 'rentas'
}

module.exports = new mssql.ConnectionPool(config);
