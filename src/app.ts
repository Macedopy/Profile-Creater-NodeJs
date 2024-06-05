import express from "express";
import { getUser } from "./Web/Controllers/entityController";
import router from "./Web/Controllers/routes";

function appCreating() {
    const app  = express();

    app.use(express.json());
    app.use("/", router)

    return app;
}
export default appCreating;