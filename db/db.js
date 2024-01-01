const { Client } = require('pg');

require('dotenv').config();
const UbuntuIP = process.env.UbuntuIP;

const createDatabase = async (database) => {
    const connectionString = `postgresql://postgres:root@UbuntuIP:5432/`;
    let client = new Client({
        connectionString,
    });

    await client.connect();
    try {
        await client.query(`CREATE DATABASE ${database}`);
        console.log(`Database "${database}" created successfully.`);
    } catch (error) {
        console.error('Error creating database:', error.message);
    } finally {
        await client.end();
    }
}

createDatabase("navXdb")