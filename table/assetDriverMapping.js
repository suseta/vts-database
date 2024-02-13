// Asset Driver Mapping

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function assetDriverMapping (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS asset_driver_mapping (
          s_entity_id	VARCHAR(10) REFERENCES entity_details(s_entity_id),
          s_entity_id_and_name VARCHAR(80),
          s_asset_id VARCHAR(10),
          s_drv1_name	VARCHAR(50),
          s_drv2_name	VARCHAR(50)
          );
        `
    await client.query(query)
    console.log('Asset Driver Mapping Table created successfully')
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

assetDriverMapping('navxdb')
