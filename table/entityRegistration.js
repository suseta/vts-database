const { Client } = require('pg');

require('dotenv').config();
const UbuntuIP = process.env.UbuntuIP;
const password = process.env.Password;

async function customerEntityDetails(database){
    const connectionString = `postgresql://postgres:password@UbuntuIP:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
        CREATE TABLE IF NOT EXISTS entity_details (
            s_entity_id VARCHAR(10) PRIMARY KEY,
            s_entity_name VARCHAR(80),
            s_prnt_entity VARCHAR(80),
            s_entity_typ VARCHAR(30),
            s_entity_grp VARCHAR(30),
            s_entity_mail VARCHAR(80),
            s_entity_pass VARCHAR(50),
            s_entity_mb_no VARCHAR(12),
            s_entity_add VARCHAR(100),
            s_entity_pin VARCHAR(10),
            s_entity_state VARCHAR(50),
            s_entity_city VARCHAR(50),
            b_is_billing BOOLEAN,
            s_billing_name VARCHAR(80),
            s_billing_typ VARCHAR(30),
            s_billing_md VARCHAR(30),
            s_billing_svr_chrg VARCHAR(20),
            s_msr_unit VARCHAR(10),
            s_gst_no VARCHAR(20),
            s_sap_code VARCHAR(10),
            s_pan_no VARCHAR(10),
            s_svr_typ VARCHAR(20),
            s_mb_actv VARCHAR(20),
            i_ovr_spd_lmt INT DEFAULT 50,
            b_is_fnd BOOLEAN,
            s_fnd_rt DOUBLE PRECISION
          );
        `;
           await client.query(query);
           console.log('Entity Details Table created successfully');  
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

customerEntityDetails("navXdb");