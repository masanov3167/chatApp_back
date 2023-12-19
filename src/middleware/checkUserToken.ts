import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { findOne } from "../utils/OrmFn";
import Users from "../entities/users.entity";
import { decoderToken } from "../utils/functions";
export interface RequestWithToken extends Request {
  user: Users
}
export const checkUserToken = async (
  req: RequestWithToken,
  _: Response,
  next: NextFunction
) => {
  const authorizationHeader = req.headers?.authorization ?? ""
  const tokenRegex = /^Bearer\s([a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_.+/=]+)$/;
  const match = authorizationHeader.match(tokenRegex);
  if (!match) {
    return next(
      new ErrorHandler(
        "token ma'lumotlaringiz xato",
        401
      )
    );
  }

  const decodedUser = decoderToken(authorizationHeader.split(" ")[1])
  if(!decodedUser){
    return next(
      new ErrorHandler(
        "token ma'lumotlaringiz xato",
        401
      )
    );
  }

  const user = await findOne(Users, { id:decodedUser.id });
  if (!user) {
    return next(
      new ErrorHandler(
        "foydalanuvchi topilmadi",
        401
      )
    );
  }
  req.user = user;
  next();
};
