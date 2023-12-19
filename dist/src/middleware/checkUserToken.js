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
exports.checkUserToken = void 0;
const errorHandler_1 = require("../utils/errorHandler");
const OrmFn_1 = require("../utils/OrmFn");
const users_entity_1 = __importDefault(require("../entities/users.entity"));
const functions_1 = require("../utils/functions");
const checkUserToken = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const authorizationHeader = (_b = (_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization) !== null && _b !== void 0 ? _b : "";
    const tokenRegex = /^Bearer\s([a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_=]+\.[a-zA-Z0-9-_.+/=]+)$/;
    const match = authorizationHeader.match(tokenRegex);
    if (!match) {
        return next(new errorHandler_1.ErrorHandler("token ma'lumotlaringiz xato", 401));
    }
    const decodedUser = (0, functions_1.decoderToken)(authorizationHeader.split(" ")[1]);
    if (!decodedUser) {
        return next(new errorHandler_1.ErrorHandler("token ma'lumotlaringiz xato", 401));
    }
    const user = yield (0, OrmFn_1.findOne)(users_entity_1.default, { id: decodedUser.id });
    if (!user) {
        return next(new errorHandler_1.ErrorHandler("foydalanuvchi topilmadi", 401));
    }
    req.user = user;
    next();
});
exports.checkUserToken = checkUserToken;
