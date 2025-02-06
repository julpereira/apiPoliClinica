import mysql from 'mysql2/promise';

const pool = mysql.createPool({
host: 'localhost',
user: 'Local instance MYSQL80',
password: 'Suporte99',
database: 'clinica'
});

export default pool;