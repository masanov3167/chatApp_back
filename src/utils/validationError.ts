import { NextFunction, Response } from "express";
import { ErrorHandler } from "./errorHandler";

const validationError = async (
  res: Response,
  err: Error,
  next: NextFunction
) => {
  try {
    res.status(422).json({
      ok: false,
      status: 422,
      message: `Validation error: ${
        String(err["details"]?.[0]?.message) || ""
      }`,
    });
  } catch (e) {
    next(new ErrorHandler(String(e), 500));
  }
};

export default validationError;
