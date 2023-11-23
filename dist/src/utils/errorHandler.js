"use strict";
/**
 * qaysidur controllerda error chiqsa o'sha error habarini response sifatida qaytarish uchun funksiya
 * if(err) return next(new ErrorHandler("nimadur xato", 405))
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandler = void 0;
class ErrorHandler extends Error {
    constructor(message, status) {
        super();
        this.message = message || "Error";
        this.status = status || 500;
    }
}
exports.ErrorHandler = ErrorHandler;
