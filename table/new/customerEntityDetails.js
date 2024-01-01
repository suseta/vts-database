const { Client } = require('pg');

async function customerEntityDetails(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS customer_entity_details (
                cus_entity_id VARCHAR(10) PRIMARY KEY,
                cus_entity_name VARCHAR(50),
                cus_entity_typ VARCHAR(20),
                cus_entity_active_status VARCHAR(10)
            );
        `;
           await client.query(query);
           console.log('customer Entity Details Table created successfully');  
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

customerEntityDetails("vtsdatabase");