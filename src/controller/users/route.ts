import { Router } from "express";
const router = Router();
import UserController from "./index";
import { CheckId } from "../../middleware/CheckId";
import { CheckUserId } from "../../middleware/checkUserId";
export default router
  .get("/all",  UserController.get)
  .get("/id/:id", CheckUserId, CheckId, UserController.getById)
  .post("/login",  UserController.login)
  .post("/register",  UserController.register)
  .put("/update/:id", CheckUserId, CheckId, UserController.put);
