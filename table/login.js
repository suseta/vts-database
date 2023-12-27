const { Client } = require('pg');

async function login(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS users (
                s_username VARCHAR(20) PRIMARY KEY,
                s_password VARCHAR(20),
                login_typ VARCHAR(20),
                s_user_email VARCHAR(50),
                t_user_crtd_on TIMESTAMP,
                t_user_last_login TIMESTAMP
            );
        `;
           await client.query(query);
           console.log('users login Table created successfully');  
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

login("vtsdatabase");