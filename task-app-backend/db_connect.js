const pg = require('pg')
require('dotenv').config();

const pool = new pg.Pool({
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
})



const connect_db =async () => {
    await pool.connect()
    console.log("db connected")
}

module.exports = {
    connect_db,
    pool
}