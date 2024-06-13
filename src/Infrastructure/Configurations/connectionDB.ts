import { Client, Pool } from "pg";
import dotenv from 'dotenv';

dotenv.config();

export const databaseConnection = async () => {
    const client = new Client({
        user: process.env.PG_USER,
        password: process.env.PG_PASSWORD,
        host: process.env.PG_HOST,
        port: Number(process.env.PG_PORT),
        database: process.env.PG_DATABASE,
    });
    client.connect(); // Wait for the connection to establish
    console.log("Connected to database!");
    return client
}