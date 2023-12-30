import { Router } from "express";
const router = Router();
import UserController from "./index";
import { checkUserToken } from "../../middleware/checkUserToken";
export default router
  .get("/all", checkUserToken,  UserController.get)
  // .post("/login",  UserController.login)
  // .post("/register",  UserController.register)
  // .put("/update",  checkUserToken, UserController.put);
