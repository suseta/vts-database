// Asset Type & Asset Capacity dropdown

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function assetInfo (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS asset_info (
          s_asset_typ	VARCHAR(30),
          s_asset_cap	VARCHAR(30)
          );
        `
    await client.query(query)
    console.log('Asset Info Table created successfully')
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

assetInfo('navxdb')
