if (!process.env.CI) {
  require('dotenv').config({
    path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env',
  });
}

const { Pool } = require('pg')

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
  ssl: { rejectUnauthorized: false }
})

async function executeSQL(sqlScript) {
  const client = await pool.connect()
  try {
    await client.query(sqlScript)
  } finally {
    client.release()
  }
}

module.exports = {
  executeSQL
}
