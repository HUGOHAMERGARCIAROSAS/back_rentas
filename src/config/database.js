// configurar mi base de datos con mssql

const sql = require('mssql');
require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DB_DATABASE,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        port: 1433,
        instanceName: process.env.DB_INSTANCE,
    }
}

async function connectToDatabase() {
    try {
        await sql.connect(config);
        console.log('Database connected');
    } catch (err) {
        console.error('Error connecting to database:', err.message);
    }
}

module.exports = {
    connectToDatabase,
    sql
};
