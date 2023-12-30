import { NextFunction, Request, Response } from "express";
import getCustomParams from "../../utils/getCustomParams";
import succesResponse from "../../utils/SuccessResponse";
import { customQuery, findAll } from "../../utils/OrmFn";
import { CustomRequest } from "../../middleware/checkUserId";
import Messages from "../../entities/message.entity";
import { ErrorHandler } from "../../utils/errorHandler";
import { dataSource } from "../../config/ormcongif";
import { getConnection } from "typeorm";

const get = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const {user: currentUser} = req;
  const {chat_id} = req.query;
  const regex = /^[1-9]\d*$/;
  if(!regex.test(chat_id?.toString())){
    return next(new ErrorHandler("chat_id yaroqli emas", 404))
  }  
  const query = `SELECT 
  m.id, m.sender_user_id,m.user_id, m.date, t.text AS "text" 
  FROM 
  chat_messages m 
  INNER JOIN 
  chat_text_messages t 
  ON 
  m.id = t.message_id 
  WHERE
  m.sender_user_id = ${currentUser.id}
  AND
  m.user_id = ${chat_id}
  OR
  m.sender_user_id = ${chat_id}
  AND
  m.user_id = ${currentUser.id}`

  const result = await customQuery(query);
  succesResponse(res, result, next);
};


export default {
  get: async (_: Request, res: Response, next: NextFunction) => {
    getCustomParams(_, res, next, get);
  },
};
