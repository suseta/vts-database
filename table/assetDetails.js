// Asset Registration

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function assetDetails (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS asset_details (
          s_asset_id VARCHAR(10) PRIMARY KEY,
          s_entity_id	VARCHAR(10) REFERENCES entity_details(s_entity_id),
          s_asset_mk VARCHAR(30),
          s_asset_mdl	VARCHAR(30),
          s_entity_id_and_name VARCHAR(80),
          s_trans_name VARCHAR(10),
          s_fuel_typ VARCHAR(10),
          s_asset_cap	VARCHAR(10),
          s_asset_typ	VARCHAR(10),
          s_site_loc VARCHAR(80),
          i_bat_volt INT,
          i_mileage	INT,
          idle_time	INT,
          reg_dt DATE,
          mfg_yr INT,
          reg_vld_dt DATE,
          gt_pass_vld_dt DATE,
          ftns_crt_vld_dt	DATE,
          plt_crt_vld_dt DATE,
          ins_vld_dt DATE,
          state_permit_vld_dt	DATE,
          nat_permit_vld_dt	DATE,
          intrnat_permit_vld_dt	DATE,
          gds_permit_vld_dt	DATE,
          rd_permit_vld_dt DATE,
          bat_pur_dt DATE,
          bat_exp_dt DATE,
          i_std_km INT,
          peso_lic_dt	DATE,
          rule_18_dt DATE,
          rule_19_dt DATE,
          s_fnd_dvc_id VARCHAR(30)
          );
        `
    await client.query(query)
    console.log('Asset Details table created successfully')
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

assetDetails('navxdb')
