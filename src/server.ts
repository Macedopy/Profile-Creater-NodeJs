import { Client } from "pg";
import appCreating from "./app";

const app  = appCreating();
const port = process.env.PORT || 5001

app.listen(port, ()=>
    {
        console.log(`Server running on port http://localhost:${port}`);
    });