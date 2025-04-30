const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: '9691429646', 
    database: 'mentor_connect', 
});

// Export pool as promise
module.exports = pool.promise();