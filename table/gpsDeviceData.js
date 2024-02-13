// Device Type

const { Client } = require('pg')

require('dotenv').config()
const ubuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function gpsDeviceData (database) {
  const connectionString = `postgresql://postgres:${password}@${ubuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS gps_device_data (
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
            d_lat DOUBLE PRECESION,
            s_lat_dir VARCHAR(10),
            d_long DOUBLE PRECESION,
            s_long_dir VARCHAR(10),
            d_alt DOUBLE PRECESION,
            d_spd DOUBLE PRECESION CHECK (d_spd >= 0.0 AND d_spd <= 999.9),
            s_grd_crs DOUBLE PRECISION CHECK (s_grd_crs >= 0 AND s_grd_crs <= 360),
            i_sat_cnt INT CHECK (i_sat_cnt >= 0 AND i_sat_cnt <= 30),
            d_hdop DOUBLE PRECESION,
            d_pdop DOUBLE PRECESION,
            s_ntw_op VARCHAR(30),
            s_ntw_typ VARCHAR(20),
            d_sgnl_pwr DOUBLE PRECESION CHECK (d_sgnl_pwr >= 1 AND d_sgnl_pwr <= 31),
            d_main_pwr DOUBLE PRECESION,
            d_int_bat_volt DOUBLE PRECESION,
            s_ign_ip VARCHAR(10),
            s_buz_op VARCHAR(10),
            s_dyn_f1 VARCHAR(100),
            s_bt_f VARCHAR(100),
            s_u_art VARCHAR(100),
            s_ext_adc_val VARCHAR(10) DEFAULT NULL,
            s_dvc_state VARCHAR(10) DEFAULT NULL,
            s_odometer VARCHAR(10),
            s_pkt_cnt VARCHAR(30),
            s_crc VARCHAR(20) CHECK (s_crc ~ '^[0-9A-F]{8}[0-9A-F]{2}$'), -- CRC (8 bytes), Checksum (2 bytes),
            c_last_char CHAR,
            CONSTRAINT check_pkt_cnt CHECK (s_pkt_cnt::INT <= 99999),
            CONSTRAINT check_odometer CHECK (s_odometer::INT <= 500000000)
        );`
    await client.query(query)
    console.log('GPS Device Data Table created successfully')
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

gpsDeviceData('navxdb')
