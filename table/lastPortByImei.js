// Port Device Mapping

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function lastPortAccessByImei (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS last_port_by_imei (
          i_imei_no VARCHAR(20),
          s_last_port_no VARCHAR(6)
          );
        `
    await client.query(query)
    console.log('last port by imei Info Table created successfully')
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

lastPortAccessByImei('navxdb')
