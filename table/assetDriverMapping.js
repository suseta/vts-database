const { Client } = require('pg')

async function assetDriverMapping (database) {
  const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS asset_driver_mapping (
                s_asset_id varchar(10) REFERENCES asset_details(s_asset_id),
                s_drv_id varchar(10) REFERENCES driver_details(s_drv_id),
                PRIMARY KEY (s_asset_id, s_drv_id)
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

assetDriverMapping('vtsdatabase')
