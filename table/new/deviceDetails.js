const { Client } = require('pg');

async function deviceDetails(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS device_details (
                imei_no VARCHAR(20) PRIMARY KEY,
                sim_no VARCHAR(20),
                sim_op VARCHAR(20),
                dvc_active_status VARCHAR(10),
                dvc_info VARCHAR(50),
                dvc_typ VARCHAR(10),
                dvc_mdl VARCHAR(20),
                dvc_mfg VARCHAR(50),
                dvc_lst_updt_ts TIMESTAMP,
                frmwr_ver VARCHAR(10),
                fuel_info BOOLEAN,
                temp_info BOOLEAN,
                RFID_info BOOLEAN
            );
        `;
           await client.query(query);
           console.log('Device details Table created successfully');  
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

deviceDetails("vtsdatabase");