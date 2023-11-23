import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "./errorHandler";

/**
 *
 * @param req - request
 * @param res - respone
 * @param next - keyingi stepga o'tqazuvchi bizga faqat error response uchun kerak
 * @param handler - asosiylogika mana shu handler funksiyada
 */

const getCustomParams = async (
  req: Request,
  res: Response,
  next: NextFunction,
  handler: Function
) => {
  try {
    await handler(req, res, next);
  } catch (e) {
    console.log(e);
    next(new ErrorHandler(String(e), 500));
  }
};

export default getCustomParams;
