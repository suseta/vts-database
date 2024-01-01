const { Client } = require('pg');

async function dataLog(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS dataLog (
                raw_pkt VARCHAR(100000) PRIMARY KEY,
                svr_ht_ts TIMESTAMP,
                status SMALLINT
            );
        `;
           await client.query(query);
           console.log('dataLog Table created successfully');  
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

dataLog("vtsdatabase");