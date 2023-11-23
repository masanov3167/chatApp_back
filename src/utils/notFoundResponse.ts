import { NextFunction } from "express";
import { ErrorHandler } from "./errorHandler";

const notFoundResponse = async (
  next: NextFunction
) => {
  

  try {
    next(new ErrorHandler("topilmadi (", 404));
  } catch (e) {
    next(new ErrorHandler(String(e), 500));
  }
};

export default notFoundResponse;
