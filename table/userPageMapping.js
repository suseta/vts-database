const { Client } = require('pg')

require('dotenv').config()
const UbuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function userPageMapping (database) {
  const connectionString = `postgresql://postgres:${password}@${UbuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS user_page_mapping (
            page_name_and_id varchar(80),
            role_name varchar(50) REFERENCES user_role(role_name)
          );
        `
    await client.query(query)
    console.log('login Table created successfully')
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

userPageMapping('navxdb')
