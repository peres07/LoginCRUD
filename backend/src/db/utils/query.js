import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function query(query, values) {
    const client = new pg.Client(process.env.CONNECTION_STRING);
    await client.connect();
    const res = await client.query(query, values);
    await client.end();
    return res;
}
