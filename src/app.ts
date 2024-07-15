import express from "express";
import { getUser } from "./Web/Controllers/entityController";
import router from "./Web/Controllers/routes";
import { databaseConnection } from "./Infrastructure/Configurations/connectionDB";

function appCreating() {
    const app  = express();

    app.use(express.json());
    app.use("/api", router)

    return app;
}
export default appCreating;