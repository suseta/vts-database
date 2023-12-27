const { Client } = require('pg');

async function transporterDetails(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS transporter_details (
                s_trans_id VARCHAR(10) PRIMARY KEY,
                s_trans_name VARCHAR(50)
            );
        `;
           await client.query(query);
           console.log('transporter details Table created successfully');  
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

transporterDetails("vtsdatabase");