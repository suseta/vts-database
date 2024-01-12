const { Client } = require('pg')

require('dotenv').config()
const UbuntuIP = process.env.UbuntuIP
const password = process.env.Password

async function customerEntityDetails (database) {
  const connectionString = `postgresql://postgres:${password}@${UbuntuIP}:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
        CREATE TABLE IF NOT EXISTS device_type (
            s_device_type_id VARCHAR(80) PRIMARY KEY,
            s_device_name VARCHAR(80),
            is_active BOOLEAN
          );
        `
    await client.query(query)
    console.log('Device Details Table created successfully')
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

customerEntityDetails('navxdb')







// INSERT INTO device_type (s_device_type_id, s_device_name, is_active) VALUES
//     ('Concox', 'Concox (8500)', true),
//     ('Concox GT06F', 'Concox GT06F (8500)', true),
//     ('Wetrack 800', 'Wetrack 800 (8505)', true),
//     ('ET-300', 'ET-300 (8502)', true),
//     ('ET-310', 'ET-310 (8611)', true),
//     ('BW-09', 'BW-09 (8502)', true),
//     ('BW-602', 'BW-602 (8502)', true),
//     ('LT-05', 'LT-05 (8502)', true),
//     ('LT-05P', 'LT-05P (8502)', true),
//     ('JV-200', 'JV-200 (8500)', true),
//     ('Coban', 'Coban (8787)', true),
//     ('GT-300', 'GT-300 (8500)', true),
//     ('GT-02', 'GT-02 (8500)', true),
//     ('RP-01', 'RP-01 (8502)', true),
//     ('TK-103', 'TK-103 (8800)', true),
//     ('TK-06A', 'TK-06A (8502)', true),
//     ('RP-01-N', 'RP-01-N (8500)', true),
//     ('Teltonika', 'Teltonika (8501)', true),
//     ('Teltonika_CAN', 'Teltonika_CAN (8501)', true),
//     ('Bofan', 'Bofan (8602)', true),
//     ('Cantrack', 'Cantrack (8601)', true),
//     ('Prime07', 'Prime07 (8603)', true),
//     ('GB101', 'GB101 (8605)', true),
//     ('Concox Ac', 'Concox Ac (8500)', true),
//     ('RP-05', 'RP-05 (8502)', true),
//     ('RP-05E', 'RP-05E (8502)', true),
//     ('RP-01 Ac', 'RP-01 Ac (8502)', true),
//     ('EV-02', 'EV-02 (8502)', true),
//     ('EV-18', 'EV-18 (8502)', true),
//     ('G19S', 'G19S (8502)', true),
//     ('PT-06', 'PT-06 (8502)', true),
//     ('TR-08', 'TR-08 (8502)', true),
//     ('TR-08A', 'TR-08A (8502)', true),
//     ('TR-06', 'TR-06 (8502)', true),
//     ('AT-06', 'AT-06 (8502)', true),
//     ('iTRI_TS101B', 'iTRI_TS101B (8604)', true),
//     ('iTRI_TS101B_CAN', 'iTRI_TS101B_CAN (8600)', true),
//     ('iTRI_UX101_CAN', 'iTRI_UX101_CAN (8600)', true),
//     ('BD-312', 'BD-312 (8606)', true),
//     ('LK-G400', 'LK-G400 (8607)', true),
//     ('CTS-2020', 'CTS-2020 (8608)', true),
//     ('GS-102', 'GS-102 (8609)', true),
//     ('VISIONTEK', 'VISIONTEK (8610)', true),
//     ('AIS_GB140', 'AIS_GB140 (8598)', true),
//     ('AIS_BHARAT-101', 'AIS_BHARAT-101 (8600)', true),
//     ('AIS_BHARAT-101-CAN', 'AIS_BHARAT-101-CAN (8600)', true),
//     ('AIS_Coordinate-140', 'AIS_Coordinate-140 (8599)', true),
//     ('AIS_Gagan-01', 'AIS_Gagan-01 (8597)', true),
//     ('AIS_WeTrack-140', 'AIS_WeTrack-140 (8596)', true),
//     ('AIS_TranSync-140', 'AIS_TranSync-140 (8618)', true),
//     ('MAPOUT_AIS-140', 'MAPOUT_AIS-140 (8594)', true),
//     ('MAPOUT_PLUS', 'MAPOUT_PLUS (8612)', true),
//     ('MapOut_Card', 'MapOut_Card (8614)', true),
//     ('ATLANTA_LC-100', 'ATLANTA_LC-100 (8613)', true),
//     ('Atlanta_OBD-2', 'Atlanta_OBD-2 (8616)', true),
//     ('Atlanta-Portable', 'Atlanta-Portable (8613)', true),
//     ('Pentode-99', 'Pentode-99 (8801)', true),
//     ('TrackerLite Plus', 'TrackerLite Plus (8598)', true),
//     ('SecureITLite', 'SecureITLite (8598)', true),
//     ('SHE_01', 'SHE_01 (8605)', true),
//     ('GS03', 'GS03 (8503)', true),
//     ('S102A', 'S102A (8503)', true),
//     ('SIWI', 'SIWI (8615)', true),
//     ('Jointech', 'Jointech (8614)', true),
//     ('RV06', 'RV06 (8503)', true),
//     ('Transight', 'Transight (8617)', true),
//     ('Concox V5', 'Concox V5 (8503)', true),
//     ('Concox V7', 'Concox V7 (8503)', true),
//     ('Cantrack Portable', 'Cantrack Portable (8601)', true),
//     ('BW-08', 'BW-08 (8503)', true),
//     ('AIS_RDM-140', 'AIS_RDM-140 (8600)', true),
//     ('BD-101', 'BD-101 (8503)', true),
//     ('VT-03', 'VT-03 (8618)', true),
//     ('BSTPL', 'BSTPL (8619)', true),
//     ('KINGWO', 'KINGWO (8616)', true),
//     ('MT-200', 'MT-200 (8616)', true),
//     ('Fifotrack', 'Fifotrack (8621)', true),
//     ('A-Telematics', 'A-Telematics (8607)', true),
//     ('Galileosky', 'Galileosky (8622)', true),
//     ('iStartek', 'iStartek (8620)', true),
//     ('iStartek-VT100', 'iStartek-VT100 (8620)', true),
//     ('iStartek-VT202', 'iStartek-VT202 (8623)', true),
//     ('Navtelecom', 'Navtelecom (8624)', true),
//     ('Ruptela', 'Ruptela (8625)', true),
//     ('Gosafe', 'Gosafe (8626)', true),
//     ('TOPFLYtech', 'TOPFLYtech (8627)', true),
//     ('Howen', 'Howen (8628)', true),
//     ('Stremax', 'Stremax (8629)', true),
//     ('ERM-Telematics', 'ERM-Telematics (8632)', true),
//     ('MT-02', 'MT-02 (8631)', true),
//     ('S-102 (C)', 'S-102 (C) (8503)', true),
//     ('LT-03', 'LT-03 (8616)', true),
//     ('M04A', 'M04A (8503)', true),
//     ('ERM-Starlink', 'ERM-Starlink (8632)', true),
//     ('W-15', 'W-15 (8503)', true),
//     ('ET06-8503', 'ET06-8503 (8503)', true),
//     ('UVEEC_INDIA_08', 'UVEEC_INDIA_08 (8600)', true),
//     ('G-500', 'G-500 (8633)', true),
//     ('Queclink', 'Queclink (8634)', true),
//     ('S106', 'S106 (8503)', true),
//     ('G-29', 'G-29 (8635)', true),
//     ('Gemeni Elite', 'Gemeni Elite (8636)', true),
//     ('AIS_Gemeni-140', 'AIS_Gemeni-140 (8600)', true),
//     ('PS10', 'PS10 (8503)', true),
//     ('HHD', 'HHD (8631)', true),
//     ('HHD-2', 'HHD-2 (8631)', true),
//     ('Traq_lock_01', 'Traq_lock_01 (8614)', true),
//     ('Traq_lock_10D', 'Traq_lock_10D (8607)', true),
//     ('WeTrack_Nic-140', 'WeTrack_Nic-140 (8600)', true),
//     ('G101 Card', 'G101 Card (8502)', true),
//     ('JT-701-D', 'JT-701-D (8614)', true),
//     ('AT-01-D', 'AT-01-D (8607)', true),
//     ('MS-100', 'MS-100 (8637)', true),
//     ('SYN-140', 'SYN-140 (8598)', true),
//     ('TMD-200A', 'TMD-200A (8600)', true),
//     ('ET-01', 'ET-01 (8640)', true),
//     ('INTRAK', 'INTRAK (8639)', true),
//     ('GEOSAT', 'GEOSAT (8644)', true),
//     ('TMD-100', 'TMD-100 (8641)', true),
//     ('Eco-NIC', 'Eco-NIC (8600)', true),
//     ('OnSat-V58', 'OnSat-V58 (8607)', true),
//     ('Huabao', 'Huabao (8631)', true),
//     ('iCore-V3', 'iCore-V3 (8642)', true),
//     ('Aira Tracker Pro', 'Aira Tracker Pro (8643)', true),
//     ('XT-09', 'XT-09 (8645)', true),
//     ('PS03', 'PS03 (8503)', true),
//     ('Cello-CAN', 'Cello-CAN (8610)', true),
//     ('PT140B', 'PT140B (8600)', true),
//     ('Sino Track', 'Sino Track (8601)', true),
//     ('Acumen_X-1', 'Acumen_X-1 (8503)', true),
//     ('AIS_CDAC-140', 'AIS_CDAC-140 (8646)', true),
//     ('AIS_Locate-140', 'AIS_Locate-140 (8600)', true),
//     ('External_G17H', 'External_G17H (8502)', true),
//     ('External_Wanway', 'External_Wanway (8502)', true),
//     ('Huabao-2', 'Huabao-2 (8631)', true),
//     ('Suntech', 'Suntech (8649)', true),
//     ('Cal/Amp', 'Cal/Amp (8650)', true),
//     ('VT-08S', 'VT-08S (8502)', true),
//     ('VT-05R', 'VT-05R (8502)', true),
//     ('H5', 'H5 (0)', true),
//     ('PS07', 'PS07 (8503)', true),
//     ('GPS Push', 'GPS Push (0)', true),
//     ('MOBILE', 'MOBILE (0)', true);