const { Client } = require('pg');

async function productInfo(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS product_info (
                s_product_name VARCHAR(45)
            );
        `;
           await client.query(query);
           console.log('Product Info Table created successfully');  
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

productInfo("vtsdatabase");