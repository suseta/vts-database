// Transporter Registration

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function transporterDetails (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS transporter_details (
            s_entity_id VARCHAR(10) REFERENCES entity_details(s_entity_id),
            s_entity_id_and_name VARCHAR(80),
            s_trans_id VARCHAR(10) PRIMARY KEY,
            s_trans_name VARCHAR(80),
            trans_tmz VARCHAR(80),
            s_trans_add VARCHAR(100),
            s_trans_mail VARCHAR(80),
            s_trans_mb_no VARCHAR(12),
            s_trans_usr VARCHAR(30),
            s_trans_pass VARCHAR(30),
            s_trans_inact_tm INT,
            s_trans_start_dt DATE,
            s_trans_due_dt DATE,
            s_trans_ext_dt DATE,
            s_trans_act_status VARCHAR(10),
            s_trans_pan VARCHAR(10),
            s_vh_sub_sync VARCHAR(10),
            s_vh_sub_end VARCHAR(10),
            b_is_bank BOOLEAN,
            s_trans_bnk VARCHAR(30),
            s_trans_brn VARCHAR(80),
            s_trans_acc_no VARCHAR(30),
            s_trans_ifsc_cd VARCHAR(20)
          );
        `
    await client.query(query)
    console.log('Transporter Details table created successfully')
  } catch (error) {
    console.error('Error creating table:', error)
  } finally {
    if (client._ending) {
      console.error('Error: Connection already closed.')
    } else {
      await client.end()
    }
  }
}

transporterDetails('navxdb')
