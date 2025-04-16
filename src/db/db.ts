//db.js

import pg, { Pool, QueryResult, PoolClient, QueryResultRow } from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
});

pool.connect((err: Error | undefined, client: PoolClient | undefined, release: () => void): void => {
    if (err) {
        return console.error('Error acquiring client', err.stack);
    }
    console.log('Connected to PostgreSQL database');
    release();
});

pool.on('error', (err: Error) => {
    console.error('Unexpected error on idle client', err);
    process.exit(-1);
   });

export const query = <T extends QueryResultRow = any>(text: string, params?: any[]): Promise<QueryResult<T>> => {
    return pool.query(text, params);
};

export default pool;
