const { Client } = require('pg');

async function gpsDeviceData(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
        connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS gps_device_data (
                start_char CHAR,
                pkt_hdr VARCHAR(30),
                frmwr_ver VARCHAR(20),
                pkt_typ VARCHAR(20),
                pkt_status VARCHAR(10),
                imei_no VARCHAR(20),
                asset_id VARCHAR(10) DEFAULT NULL,
                gps_status SMALLINT,
                gps_dt DATE,
                gps_tm TIME,
                lat DOUBLE PRECISION,
                lat_dir VARCHAR(10),
                long DOUBLE PRECISION,
                long_dir VARCHAR(10),
                alt DOUBLE PRECISION,
                f_speed FLOAT,
                grd_crs VARCHAR(10),
                sat_cnt INT,
                hdop FLOAT,
                pdop FLOAT,
                ntw_op VARCHAR(30),
                ntw_typ VARCHAR(20),
                sgnl_pwr FLOAT,
                main_pwr FLOAT,
                int_bat_volt FLOAT,
                ignition_ip VARCHAR(10),
                buz_op VARCHAR(10),
                dyn_f1 VARCHAR(100),
                bt_f VARCHAR(100),
                u_art VARCHAR(100),
                ext_adc_val VARCHAR(10) DEFAULT NULL,
                dvc_state VARCHAR(10) DEFAULT NULL,
                odometer VARCHAR(10),
                pkt_cnt VARCHAR(30),
                crc VARCHAR(20),
                last_char CHAR
            );
        `;
            await client.query(query);
            console.log('Asset Info Table created successfully');  
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
    
gpsDeviceData("vtsdatabase");