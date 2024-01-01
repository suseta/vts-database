const { Client } = require('pg');

async function assetInfo(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS asset_info (
                s_fuel_typ VARCHAR(20),
                s_asset_typ VARCHAR(20),
                s_asset_cap VARCHAR(20)
            );
        `;
           await client.query(query);
           console.log('Asset Info Table created successfully');  
        } catch(error){
           console.error('Error creating table:', error);
      } finally {
      if (client._ending) {
          console.error('Error: Connection already closed.');
      } else {
          await client.end();
      }
  }
}

assetInfo("vtsdatabase");