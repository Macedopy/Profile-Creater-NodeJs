import { Router } from "express";
import * as UserController from "./entityController";

const router = Router();

router.get("/users", UserController.getUser);
router.get("/users/:id", UserController.getUserById)

router.post("/users", UserController.postUser)

router.delete("/users/:id", UserController.deleteUser)

router.patch("/users/:id", UserController.updateUser)

export default router;