import appCreating from "./app";

const app  = appCreating();
const port = process.env.PORT;

app.listen(port, ()=>
    {
        console.log(`Server running on port http://localhost:${port}`);
    });