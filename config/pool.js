const mysql = require('mysql2/promise')

const pool = mysql.createPool({
  host: 'localhost',
  port: 3306,
  user: 'tools',
  password: '22110096',
  database: 'tools',
  connectionLimit: 10
})

module.exports = pool