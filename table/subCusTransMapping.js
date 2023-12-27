const { Client } = require('pg');

async function subCusTransMapping(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS sub_cus_trans_mapping (
                sub_cus_entity_id VARCHAR(10) REFERENCES sub_cus_entity_details(sub_cus_entity_id),
                s_trans_id VARCHAR(10) REFERENCES transporter_details(s_trans_id),
                PRIMARY KEY (sub_cus_entity_id, s_trans_id) 
            );
        `;
           await client.query(query);
           console.log('Sub Customer Transporter Mapping Table created successfully');  
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

subCusTransMapping("vtsdatabase");