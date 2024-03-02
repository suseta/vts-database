// SIM Info Entry

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function deviceDetails (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS sim_details (
          s_sim_no VARCHAR(20) PRIMARY KEY,
          s_sim_op VARCHAR(50),
          sim_add_dt DATE,
          sim_dlt_dt DATE,
          s_sim_status VARCHAR(10)
          );
        `
    await client.query(query)
    console.log('SIM Details table created successfully')
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

deviceDetails('navxdb')
