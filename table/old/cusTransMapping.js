const { Client } = require('pg');

async function cusTransMapping(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS cus_trans_mapping (
                cus_entity_id VARCHAR(10) REFERENCES customer_entity_details(cus_entity_id),
                s_trans_id VARCHAR(10) REFERENCES transporter_details(s_trans_id),
                PRIMARY KEY (cus_entity_id, s_trans_id) 
            );
        `;
           await client.query(query);
           console.log('Customer Transporter Mapping Table created successfully');  
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

cusTransMapping("vtsdatabase");