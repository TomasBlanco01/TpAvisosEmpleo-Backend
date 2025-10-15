import pkg from 'pg';
const { Pool } = pkg;
/*const { Pool } = require('pg');
require('dotenv').config();*/

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
  /*
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  */
});

pool.connect()
  .then(() => console.log('✅ Conectado a PostgreSQL'))
  .catch(err => console.error('❌ Error de conexión a PostgreSQL', err));

//module.exports = pool;
export default pool