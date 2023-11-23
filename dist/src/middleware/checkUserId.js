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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckUserId = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const OrmFn_1 = require("../utils/OrmFn");
const users_entity_1 = __importDefault(require("../entities/users.entity"));
const CheckUserId = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.headers.id);
    if (isNaN(id)) {
        return next(new errorHandler_1.ErrorHandler("id faqat raqam bo'lishi kerak", 500));
    }
    const user = yield (0, OrmFn_1.findOne)(users_entity_1.default, { id });
    if (!user) {
        return next(new errorHandler_1.ErrorHandler("foydalanuvchi topilmadi", 500));
    }
    req.userId = id;
    req.user = user;
    next();
});
exports.CheckUserId = CheckUserId;
