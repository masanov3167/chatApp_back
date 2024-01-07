import { NextFunction,  Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { CustomRequest } from "./checkUserId";

export const checkChatId = async (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  const {chat_id} = req.query;
  const regex = /^[1-9]\d*$/;
  if(!regex.test(chat_id?.toString())){
    return next(new ErrorHandler("chat_id yaroqli emas", 404))
  }  
  next();
};
