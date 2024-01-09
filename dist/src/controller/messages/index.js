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
const message_entity_1 = __importDefault(require("../../entities/message.entity"));
const errorHandler_1 = require("../../utils/errorHandler");
const multerconfig_1 = __importDefault(require("../../config/multerconfig"));
const voice_messages_entity_1 = __importDefault(require("../../entities/voice.messages.entity"));
const functions_1 = require("../../utils/functions");
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: currentUser } = req;
    const { chat_id } = req.query;
    const regex = /^[1-9]\d*$/;
    if (!regex.test(chat_id === null || chat_id === void 0 ? void 0 : chat_id.toString())) {
        return next(new errorHandler_1.ErrorHandler("chat_id yaroqli emas", 404));
    }
    const query = `SELECT 
  m.id, 
  m.sender_user_id, 
  m.user_id, 
  m.date, 
  CASE WHEN t.text IS NOT NULL THEN t.text END AS "text", 
  CASE 
    WHEN v IS NOT NULL
    THEN JSON_BUILD_OBJECT('size', v.size, 'duration',v.duration, 'path', v.path) 
  END AS "voice"
FROM 
  chat_messages m 
LEFT JOIN 
  chat_text_messages t 
ON 
  m.id = t.message_id 
LEFT JOIN
  chat_voice_messages v
ON
  m.id = v.message_id
WHERE
  (m.sender_user_id = ${currentUser.id} AND m.user_id = ${chat_id})
  OR
  (m.sender_user_id = ${chat_id} AND m.user_id = ${currentUser.id})`;
    const query1 = `SELECT 
  m.id, 
  m.sender_user_id, 
  m.user_id, 
  m.date, 
  t.text AS "text", 
  CASE 
    WHEN v.path IS NOT NULL
    THEN JSON_BUILD_OBJECT('size', v.size, 'duration',v.duration, 'path', v.path) 
  END AS "voice"
FROM 
  chat_messages m 
LEFT JOIN 
  chat_text_messages t 
ON 
  m.id = t.message_id 
LEFT JOIN
  chat_voice_messages v
ON
  m.id = v.message_id
WHERE
  (m.sender_user_id = ${currentUser.id} AND m.user_id = ${chat_id})
  OR
  (m.sender_user_id = ${chat_id} AND m.user_id = ${currentUser.id})`;
    const result = yield (0, OrmFn_1.customQuery)(query1);
    (0, SuccessResponse_1.default)(res, result, next);
});
const uploadVoice = (req, res, next) => {
    const regex = /\.(mp3|wav|aac|ogg|flac|aiff|m4a|wma)$/;
    const voiceStorage = (0, multerconfig_1.default)("voices", regex);
    if (voiceStorage) {
        const upload = voiceStorage.single("voice");
        upload(req, res, function (err) {
            if (err || !req.file) {
                return next(new errorHandler_1.ErrorHandler(err ? String(err) : "voice not found", 404));
            }
            next();
        });
    }
    else {
        return next(new errorHandler_1.ErrorHandler("fayl yuklashda muammo"));
    }
};
const postVoice = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { user: currentUser } = req;
    const { chat_id } = req.query;
    const newMessage = yield (0, OrmFn_1.insert)(message_entity_1.default, { sender_user_id: currentUser.id, user_id: chat_id });
    if (newMessage.ok && newMessage.data) {
        const voiceMessage = yield (0, OrmFn_1.insert)(voice_messages_entity_1.default, { message_id: newMessage.data.id, path: `public/voices/${req.file.filename}`, duration: 30, size: req.file.size });
        if (voiceMessage.ok) {
            const responseData = {
                id: newMessage.data.id,
                sender_user_id: currentUser.id,
                user_id: chat_id,
                date: newMessage.data.date,
                voice: {
                    path: voiceMessage.data.path,
                    size: voiceMessage.data.size,
                    duration: voiceMessage.data.duration
                }
            };
            (0, SuccessResponse_1.default)(res, responseData, next);
            return;
        }
        else {
            yield (0, OrmFn_1.destroyer)(message_entity_1.default, { id: newMessage.data.id });
            (0, functions_1.removeMedia)(`voices/${req.file.filename}`);
            return next(new errorHandler_1.ErrorHandler("Fayl yuklashda hatolik :("));
        }
    }
    else {
        (0, functions_1.removeMedia)(`voices/${req.file.filename}`);
        return next(new errorHandler_1.ErrorHandler("Fayl yuklashda hatolik :("));
    }
});
exports.default = {
    get: (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(_, res, next, get);
    }),
    postVoice: (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(_, res, next, postVoice);
    }),
    uploadVoice: (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(_, res, next, uploadVoice);
    }),
};
