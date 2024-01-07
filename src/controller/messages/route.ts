import { Router } from "express";
const router = Router();
import messageController from "./index";
import { checkUserToken } from "../../middleware/checkUserToken";
import { checkChatId } from "../../middleware/checkChatId";
import multer, { StorageEngine } from "multer";
import storage from "../../config/multerconfig";
import { ErrorHandler } from "../../utils/errorHandler";
export default router
.get("/all", checkUserToken,  messageController.get)
.post("/voice", checkUserToken, checkChatId, messageController.uploadVoice,  messageController.postVoice)
  // .post("/register",  UserController.register)
  // .put("/update",  checkUserToken, UserController.put);
