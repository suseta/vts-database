// Asset Device Mapping

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function assetDeviceMapping (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS asset_device_mapping (
          s_entity_id	VARCHAR(80) REFERENCES entity_details(s_entity_id),
          s_entity_id_and_name VARCHAR(80),
          s_ad_mp_pur	VARCHAR(80),
          asset_dvc_mp_dt	DATE,
          s_dvc_typ	VARCHAR(80),
          s_prd_typ VARCHAR(80),
          s_asset_id VARCHAR(80),
          s_asset_typ	VARCHAR(80),
          i_nw_imei_no VARCHAR(80),
          i_old_imei_no	VARCHAR(80),
          s_trk_typ	VARCHAR(80),
          s_old_sim_no VARCHAR(80),
          s_nw_sim_no	VARCHAR(80),
          s_sim_op VARCHAR(50),
          s_mx_spd INT,
          s_crct_spd INT,
          s_svr_eng_name VARCHAR(80),
          s_svr_eng_mail VARCHAR(80),
          s_svr_eng_mb_no	VARCHAR(12)
          );
        `
    await client.query(query)
    console.log('Asset Device Mapping table created successfully')
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

assetDeviceMapping('navxdb')
