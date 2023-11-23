import { NextFunction, Request, Response } from "express";
import { ErrorHandler } from "../utils/errorHandler";

export const CheckId = async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return next(
      new ErrorHandler(
        "id faqat raqam bo'lishi kerak" ,
        500
      )
    );
  }
  next();
};
