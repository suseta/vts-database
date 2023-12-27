const { Client } = require('pg');

const createDatabase = async (database) => {
    const connectionString = `postgresql://postgres:root@65.2.151.41:5432/`;
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

createDatabase("vtsdatabase")