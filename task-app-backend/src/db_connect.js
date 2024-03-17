const pg = require("pg");
require("dotenv").config();

const dbUser = process.env.PGUSER;
const dbPass = process.env.PGPASSWORD;
const dbHost = process.env.PGHOST;
const dbPort = process.env.PGPORT;
const dbName = process.env.PGDATABASE;
const schema = process.env.PGSCHEMA;

let connectionURI = `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}`;

if (schema) {
  connectionURI = `postgres://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbName}?schema=${schema}`;
}

const pool = new pg.Pool({
  connectionString: connectionURI,
});

const connect_db = async () => {
  await pool.connect();
  console.log("db connected");
};

module.exports = {
  connect_db,
  pool,
};
