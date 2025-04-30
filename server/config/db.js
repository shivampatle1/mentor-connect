const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
    host: 'db1877.hstgr.io',
    user: 'u553928949_connect', 
    password: '8999Shiv@m', 
    database: 'u553928949_connect', 
});

// Export pool as promise
module.exports = pool.promise();