import {Client} from "pg";

export const databaseConnection = async(client: Client) =>
{
    (async () => {
        const client = new Client(
            {
                user: process.env.PG_USER,
                password: process.env.PG_PASSWORD,
                host: process.env.PG_HOST,
                port: Number(process.env.PG_PORT),
                database: process.env.PG_DATABASE,
            });
            await client.connect().then(() => 
                {
                    console.warn("Connected Postgree Database {}", client.port);
                })
                .catch((err) => 
                    {
                        console.error("Error connecting to Postgree Database ", err)
                    })
                })
    return client;
}
