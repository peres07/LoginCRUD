import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

export async function findLogin(email, password) {
    const client = new pg.Client(process.env.CONNECTION_STRING);
    await client.connect();
    const res = await client.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    await client.end();
    if (!res.rows[0]) return false;
    return res.rows[0];
}

export async function findUser(username) {
    const client = new pg.Client(process.env.CONNECTION_STRING);
    await client.connect();
    const res = await client.query('SELECT * FROM users WHERE username = $1', [username]);
    await client.end();
    if (!res.rows[0]) return false;
    return true;
}

export async function findEmail(email) {
    const client = new pg.Client(process.env.CONNECTION_STRING);
    await client.connect();
    const res = await client.query('SELECT * FROM users WHERE email = $1', [email]);
    await client.end();
    if (!res.rows[0]) return false;
    return true;
}

export async function register(username, email, password) {
    try {
        const client = new pg.Client(process.env.CONNECTION_STRING);
        await client.connect();
        await client.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, password]);
        await client.end();
        return true;
    }
    catch {
        return false;
    }
    
}