import mysql from 'mysql2/promise';

const pool = mysql.createPool({
host: 'localhost',
user: 'policlinica',
password: 'poli123',
database: 'clinica'
});

export default pool;