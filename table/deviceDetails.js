// Device Entry

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
        CREATE TABLE IF NOT EXISTS device_details (
          i_imei_no	VARCHAR(20) PRIMARY KEY,
          s_sim_no VARCHAR(20),
          s_sim_op VARCHAR(50),
          s_dvc_typ	VARCHAR(50),
          dvc_mdl_name VARCHAR(80),
          dvc_timezone VARCHAR(80),
          dvc_mfg_dt DATE,
          dvc_add_dt DATE,
          dvc_dlt_dt DATE,
          s_atd	VARCHAR(20),
          s_dvc_status VARCHAR(10),
          is_ign_wr	BOOLEAN,
          is_air_wr	BOOLEAN
          );
        `
    await client.query(query)
    console.log('Device Details Table created successfully')
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
