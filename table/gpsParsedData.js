// GPS Parsed Data from dataLog table - Master table for all parsed data

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function gpsParsedData (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
    CREATE TABLE IF NOT EXISTS gps_parsed_data (
            c_start_char CHAR,
            s_pkt_hdr VARCHAR(30),
            s_frmwr_ver VARCHAR(20),
            s_pkt_typ VARCHAR(20),
            s_pkt_status VARCHAR(10),
            s_imei_no VARCHAR(20),
            s_asset_id VARCHAR(10) DEFAULT NULL,
            i_gps_status SMALLINT,
            gps_dt DATE,
            gps_tm TIME,
            d_lat DOUBLE PRECISION,
            s_lat_dir VARCHAR(10),
            d_long DOUBLE PRECISION,
            s_long_dir VARCHAR(10),
            d_alt DOUBLE PRECISION,
            d_spd DOUBLE PRECISION CHECK (d_spd >= 0.0 AND d_spd <= 999.9),
            s_grd_crs VARCHAR(10),
            i_sat_cnt INT,
            d_hdop DOUBLE PRECISION,
            d_pdop DOUBLE PRECISION,
            s_ntw_op VARCHAR(30),
            s_ntw_typ VARCHAR(20),
            d_sgnl_pwr DOUBLE PRECISION,
            d_sgnl_pwr DOUBLE PRECISION,
            d_int_bat_volt DOUBLE PRECISION,
            s_ign_ip VARCHAR(10),
            s_buz_op VARCHAR(10),
            s_dyn_f1 VARCHAR(100),
            s_bt_f VARCHAR(100),
            s_u_art VARCHAR(100),
            s_ext_adc_val VARCHAR(10) DEFAULT NULL,
            s_dvc_state VARCHAR(10) DEFAULT NULL,
            s_odometer VARCHAR(10),
            s_pkt_cnt VARCHAR(30),
            s_crc VARCHAR(20),
            c_last_char CHAR,
            CONSTRAINT check_pkt_cnt CHECK (s_pkt_cnt::INT <= 99999),
        );`
    await client.query(query)
    console.log('GPS Parsed Data Table created successfully')
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

gpsParsedData('navxdb')
