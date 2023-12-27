const { Client } = require('pg');

async function locSubCusEntityMapping(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS loc_sub_cus_entity_mapping (
                s_loc_pin VARCHAR(10) REFERENCES plant_loc_details(s_loc_pin),
                sub_cus_entity_id VARCHAR(10) REFERENCES sub_cus_entity_details(sub_cus_entity_id),
                PRIMARY KEY (s_loc_pin, sub_cus_entity_id) 
            );
        `;
           await client.query(query);
           console.log('location subCustomerEntity mapping Table created successfully');  
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

locSubCusEntityMapping("vtsdatabase");