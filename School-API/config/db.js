const mysql = require('mysql2/promise');
require('dotenv').config();
const fs=require('fs');
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port:process.env.DB_PORT,
  ssl: {
    ca:fs.readFileSync(process.env.CA)
  }
});

module.exports = pool;