const { Client } = require('pg')

require('dotenv').config()
const UbuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function userRole (database) {
  const connectionString = `postgresql://postgres:${password}@${UbuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS user_role (
            id SERIAL PRIMARY KEY,
            role_name VARCHAR(50) UNIQUE NOT NULL
          );
        `
    await client.query(query)
    console.log('User Role table created successfully')
  } catch (error) {
    console.error('Error creating table:', error)
  } finally {
    if (client._ending) {
      console.error('Error: Connection already closed.')
    } else {
      await client.end()
    }
  }
}

userRole('navxdb')
