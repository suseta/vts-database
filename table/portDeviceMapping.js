// Port Device Mapping

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function portDeviceMapping (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS port_device_mapping (
          i_imei_no VARCHAR(20),
          i_port_no VARCHAR(6),
          prt_dvc_mp_dt DATE,
          prt_dvc_unmp_dt DATE
          );
        `
    await client.query(query)
    console.log('device port mapping Info Table created successfully')
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

portDeviceMapping('navxdb')
