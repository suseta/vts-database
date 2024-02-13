// Device Type

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function dataLog (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS dataLog (
            s_raw_pkt VARCHAR(100000) PRIMARY KEY,
            svr_ht_ts TIMESTAMP,
            i_status SMALLINT

          );
        `
    await client.query(query)
    console.log('Datalog Table created successfully')
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

dataLog('navxdb')
