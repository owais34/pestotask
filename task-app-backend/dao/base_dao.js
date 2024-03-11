const { pool } = require("../db_connect");
require("dotenv").config();

class BaseDao {
  static async query(query, params = []) {
    if (process.env.DB_SCHEMA) {
        console.log(process.env.DB_SCHEMA)
      await pool.query(`SET search_path TO '${process.env.DB_SCHEMA}';`);
    }
    const result = await pool.query(query, params);
    return result;
  }
}

module.exports = {
  BaseDao,
};
