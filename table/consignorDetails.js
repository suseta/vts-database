const { Client } = require('pg')

async function consignorDetails (database) {
  const connectionString = `postgresql://postgres:root@65.2.151.41:5432/${database}`
  let client = new Client({
    connectionString
  })
  await client.connect()
  try {
    const query = `
            CREATE TABLE IF NOT EXISTS consignor_details (
                s_consignor_id VARCHAR(10) REFERENCES consignor(s_consignor_id),
                cus_entity_id VARCHAR(10) REFERENCES customer_entity_details(cus_entity_id),
                s_trans_id VARCHAR(10) REFERENCES transporter_details(s_trans_id),
                s_start_pt VARCHAR(50),
                s_dst_pt VARCHAR(50),
                lat VARCHAR(10),
                lat_dir VARCHAR(10),
                long VARCHAR(10),
                long_dir VARCHAR(10),
                rad VARCHAR(10),
                s_cntct_prsn VARCHAR(50),
                cntct_prsn_no VARCHAR(12)
            );
        `
    await client.query(query)
    console.log('consignor details Table created successfully')
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

consignorDetails('vtsdatabase')
