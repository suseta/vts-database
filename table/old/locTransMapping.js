const { Client } = require('pg');

async function locTransMapping(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS loc_trans_mapping (
                s_loc_pin VARCHAR(10) REFERENCES plant_loc_details(s_loc_pin),
                s_trans_id VARCHAR(10) REFERENCES transporter_details(s_trans_id),
                PRIMARY KEY (s_loc_pin, s_trans_id) 
            );
        `;
           await client.query(query);
           console.log('location Transporter mapping Table created successfully');  
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

locTransMapping("vtsdatabase");