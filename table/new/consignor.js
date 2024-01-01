const { Client } = require('pg');

async function consignor(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS consignor (
                s_consignor_id VARCHAR(10) PRIMARY KEY,
                s_consignor_name VARCHAR(50)
            );
        `;
           await client.query(query);
           console.log('consignor Table created successfully');  
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

consignor("vtsdatabase");