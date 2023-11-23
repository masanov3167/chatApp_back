import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";
import { findOne } from "../utils/OrmFn";
import Users from "../entities/users.entity";
export interface CustomRequest extends Request {
  userId?: number;
  user: Users;
}
export const CheckUserId = async (
  req: CustomRequest,
  _: Response,
  next: NextFunction
) => {
  const id = Number(req.headers.id);
  if (isNaN(id)) {
    return next(
      new ErrorHandler(
        "id faqat raqam bo'lishi kerak",
        500
      )
    );
  }

  const user = await findOne(Users, { id });
  if (!user) {
    return next(
      new ErrorHandler(
        "foydalanuvchi topilmadi",
        500
      )
    );
  }
  req.userId = id;
  req.user = user;
  next();
};
