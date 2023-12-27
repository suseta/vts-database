const { Client } = require('pg')

async function driverDetails (database) {
  const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS driver_details (
                s_drv_id VARCHAR(10) PRIMARY KEY,
                s_drv_name VARCHAR(50),
                cus_entity_id VARCHAR(10) REFERENCES customer_entity_details(cus_entity_id),
                s_drv_email VARCHAR(50),
                s_ph_no VARCHAR(12),
                s_drv_add VARCHAR(100),
                s_drv_cntry VARCHAR(30),
                s_drv_state VARCHAR(30),
                s_drv_city VARCHAR(30),
                s_drv_pin VARCHAR(10),
                s_lic_no VARCHAR(20),
                lic_vld_dt DATE,
                s_smart_crd_no VARCHAR(20),
                s_hzrd_crt_no VARCHAR(20),
                hzrd_vld_dt DATE,
                med_tst_dt DATE,
                prd_trn_dt DATE,
                ddt_exp_dt DATE,
                s_rmk VARCHAR(100),
                s_covid_status VARCHAR(10)
            );
        `
    await client.query(query)
    console.log('Driver details Table created successfully')
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

driverDetails('vtsdatabase')
