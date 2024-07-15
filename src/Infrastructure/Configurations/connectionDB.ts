import { Client, Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

export const databaseConnection = async () => {
    const client = new Pool({
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        database: process.env.PG_DATABASE,
        ssl: false
    });
    try
    {
        return client;
    }catch(err)
    {
        throw err;
    }
}