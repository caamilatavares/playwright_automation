require('dotenv').config()

const { pool, Pool } = require('pg')

const DbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
}

export async function executeSQL(sqlScript) {
    try {
        const pool = new Pool(DbConfig)
        const client = await pool.connect()

        await client.query(sqlScript)
    } catch(error){
        console.log('Error of executing the SQL script: ' + error)
    }
}