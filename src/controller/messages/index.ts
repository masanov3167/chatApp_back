import { NextFunction, Request, Response } from "express";
import getCustomParams from "../../utils/getCustomParams";
import succesResponse from "../../utils/SuccessResponse";
import { customQuery, destroyer, findAll, insert } from "../../utils/OrmFn";
import { CustomRequest } from "../../middleware/checkUserId";
import Messages from "../../entities/message.entity";
import { ErrorHandler } from "../../utils/errorHandler";
import { dataSource } from "../../config/ormcongif";
import { getConnection } from "typeorm";
import storage from "../../config/multerconfig";
import VoiceMessages from "../../entities/voice.messages.entity";
import { removeMedia } from "../../utils/functions";

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

const uploadVoice = (req: Request, res: Response, next: NextFunction) => {
  const regex = /\.(mp3|wav|aac|ogg|flac|aiff|m4a|wma)$/
  const voiceStorage = storage("voices", regex);
  if(voiceStorage){
    const upload = voiceStorage.single("voice")
    upload(req, res,  function (err: any) {
    if (err || !req.file) {
      return next(new ErrorHandler(err ? String(err) :"voice not found", 404))
    }  
    next()
    });
    }else{
      return next(new ErrorHandler("fayl yuklashda muammo"))
    }
  }

const postVoice = async (req: CustomRequest, res: Response, next: NextFunction) => {
  const {user: currentUser} = req;
  const {chat_id} = req.query;
  const newMessage = await insert(Messages,{sender_user_id: currentUser.id, user_id: chat_id});
  if(newMessage.ok && newMessage.data){
    const voiceMessage = await insert(VoiceMessages, {message_id: newMessage.data.id, path:`public/voices/${req.file.filename}`, duration:30, size:req.file.size});
    if(voiceMessage.ok){
      const responseData = {
        id:newMessage.data.id,
        sender_user_id:currentUser.id,
        user_id: chat_id,
        date: newMessage.data.date,
        voice:{
          path: voiceMessage.data.path,
          size: voiceMessage.data.size,
          duration: voiceMessage.data.duration
        }
      }
      succesResponse(res, responseData, next);
      return
    }else{
      await destroyer(Messages,{id:newMessage.data.id});
      removeMedia(`voices/${req.file.filename}`);
      return next(new ErrorHandler("Fayl yuklashda hatolik :("))
    }
  }else{
    removeMedia(`voices/${req.file.filename}`);
    return next(new ErrorHandler("Fayl yuklashda hatolik :("))
  }
};

export default {
  get: async (_: Request, res: Response, next: NextFunction) => {
    getCustomParams(_, res, next, get);
  },
  postVoice: async (_: Request, res: Response, next: NextFunction) => {
    getCustomParams(_, res, next, postVoice);
  },
  uploadVoice: async (_: Request, res: Response, next: NextFunction) => {
    getCustomParams(_, res, next, uploadVoice);
  },
};
