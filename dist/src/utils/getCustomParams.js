"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler_1 = require("./errorHandler");
/**
 *
 * @param req - request
 * @param res - respone
 * @param next - keyingi stepga o'tqazuvchi bizga faqat error response uchun kerak
 * @param handler - asosiylogika mana shu handler funksiyada
 */
const getCustomParams = (req, res, next, handler) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield handler(req, res, next);
    }
    catch (e) {
        console.log(e);
        next(new errorHandler_1.ErrorHandler(String(e), 500));
    }
});
exports.default = getCustomParams;
