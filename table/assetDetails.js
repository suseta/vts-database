const { Client } = require('pg');

async function assetDetails(database){
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`;
    let client = new Client({
      connectionString,
    });
    await client.connect();
    try {
        const query = `
            CREATE TABLE IF NOT EXISTS asset_details (
                s_asset_id VARCHAR(10) PRIMARY KEY,
                s_asset_name VARCHAR(30),
                s_asset_mdl VARCHAR(30),
                cus_entity_id VARCHAR(10) REFERENCES customer_entity_details(cus_entity_id),
                s_trans_id VARCHAR(10) REFERENCES transporter_details(s_trans_id),
                s_loc_pin VARCHAR(10) REFERENCES plant_loc_details(s_loc_pin),
                imei_no VARCHAR(20) REFERENCES device_details(imei_no),
                s_fuel_typ VARCHAR(10),
                s_asset_cap VARCHAR(10),
                s_asset_typ VARCHAR(10),
                d_tare_wt DOUBLE,
                d_gross_wt DOUBLE,
                mileage INT,
                ovrspd_lmt INT,
                reg_dt DATE,
                mfg_dt DATE,
                reg_vld_dt DATE,
                gt_pass DATE,
                ftns_crt_dt DATE,
                plt_crt_dt DATE,
                ins_vld_dt DATE,
                state_permit_dt DATE,
                intrnat_permit_dt DATE,
                gds_permit_dt DATE,
                rd_permit_dt DATE,
                bat_pur_dt DATE,
                bat_exp_dt DATE,
                s_nat_crt_no VARCHAR(20),
                nat_test_dt DATE,
                nat_crt_vld_dt DATE,
                d_std_km DOUBLE,
                peso_lic_dt DATE,
                rule_18 DATE,
                rule_19 DATE,
                s_fnd_dvc_id VARCHAR(30),
                i_st_cap INT,
                s_cus_rmk VARCHAR(100),
                s_bill_rmk VARCHAR(100)
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

assetDetails("vtsdatabase");