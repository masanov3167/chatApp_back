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
const getCustomParams_1 = __importDefault(require("../../utils/getCustomParams"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const OrmFn_1 = require("../../utils/OrmFn");
const errorHandler_1 = require("../../utils/errorHandler");
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: currentUser } = req;
    const { chat_id } = req.query;
    const regex = /^[1-9]\d*$/;
    if (!regex.test(chat_id === null || chat_id === void 0 ? void 0 : chat_id.toString())) {
        return next(new errorHandler_1.ErrorHandler("chat_id yaroqli emas", 404));
    }
    const query = `SELECT 
  m.id, m.sender_user_id,m.user_id, m.date, t.text AS "text" 
  FROM 
  chat_messages m 
  INNER JOIN 
  chat_text_messages t 
  ON 
  m.id = t.message_id 
  WHERE
  m.sender_user_id = ${currentUser.id}
  AND
  m.user_id = ${chat_id}
  OR
  m.sender_user_id = ${chat_id}
  AND
  m.user_id = ${currentUser.id}`;
    const result = yield (0, OrmFn_1.customQuery)(query);
    (0, SuccessResponse_1.default)(res, result, next);
});
exports.default = {
    get: (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(_, res, next, get);
    }),
};
