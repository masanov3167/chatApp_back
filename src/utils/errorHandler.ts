/**
 * qaysidur controllerda error chiqsa o'sha error habarini response sifatida qaytarish uchun funksiya
 * if(err) return next(new ErrorHandler("nimadur xato", 405))
 */

export class ErrorHandler extends Error {
  status: number;
  constructor(message?: string, status?: number) {
    super();
    this.message = message || "Error";
    this.status = status || 500;
  }
}
