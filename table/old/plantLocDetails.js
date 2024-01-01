const { Client } = require('pg');

async function plantLocDetails(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS plant_loc_details (
                s_loc_pin VARCHAR(10) PRIMARY KEY,
                s_loc_name VARCHAR(50)
            );
        `;
           await client.query(query);
           console.log('Plant Location details Table created successfully');  
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

plantLocDetails("vtsdatabase");