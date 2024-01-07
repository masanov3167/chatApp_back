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
exports.checkChatId = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const checkChatId = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { chat_id } = req.query;
    const regex = /^[1-9]\d*$/;
    if (!regex.test(chat_id === null || chat_id === void 0 ? void 0 : chat_id.toString())) {
        return next(new errorHandler_1.ErrorHandler("chat_id yaroqli emas", 404));
    }
    next();
});
exports.checkChatId = checkChatId;