// Contains raw data coming from device

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
            s_unique_id VARCHAR(52) PRIMARY KEY,
            s_raw_pkt VARCHAR(100000),
            svr_ht_ts TIMESTAMP,
            i_status SMALLINT,
            s_port_no VARCHAR(6),
            i_imei_no VARCHAR(20)
          );
        `
    await client.query(query)
    console.log('Data Log table created successfully')
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
