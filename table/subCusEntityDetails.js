const { Client } = require('pg');

async function subCusEntityDetails(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS sub_cus_entity_details (
                sub_cus_entity_id VARCHAR(10) PRIMARY KEY,
                sub_cus_entity_name VARCHAR(50),
                sub_cus_entity_typ VARCHAR(20),
                sub_cus_entity_active_status VARCHAR(10),
                sub_cus_parent_entity_id VARCHAR(10),
                sub_cus_imdt_parent_entity_id VARCHAR(10)   
            );
        `;
           await client.query(query);
           console.log('sub customer Entity Details Table created successfully');  
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

subCusEntityDetails("vtsdatabase");