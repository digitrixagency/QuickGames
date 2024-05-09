const { Pool } = require('pg');

const pool = new Pool({
    user: 'your_username',
    host: 'localhost',
    database: 'mydatabase',
    password: 'your_password',
    port: 5432, // Default PostgreSQL port
});

module.exports = pool;