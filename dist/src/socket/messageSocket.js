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
const OrmFn_1 = require("../utils/OrmFn");
const message_entity_1 = __importDefault(require("../entities/message.entity"));
const text_messages_entity_1 = __importDefault(require("../entities/text.messages.entity"));
const online_users_entity_1 = __importDefault(require("../entities/online.users.entity"));
exports.default = (io, socket) => {
    try {
        socket.on("message", (msg) => {
            console.log(`Message: ${msg}`);
            io.emit("answer-message", `${msg} ga serverdan javob`);
        });
        socket.on("new-message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
            const { sender_user_id, user_id, text } = JSON.parse(msg);
            const newMessage = yield (0, OrmFn_1.insert)(message_entity_1.default, { sender_user_id, user_id });
            if (newMessage.ok) {
                const messageText = yield (0, OrmFn_1.insert)(text_messages_entity_1.default, { message_id: newMessage.data.id, text });
                if (messageText.ok) {
                    const toUser = yield (0, OrmFn_1.findOne)(online_users_entity_1.default, { user_id: user_id });
                    const own = yield (0, OrmFn_1.findOne)(online_users_entity_1.default, { user_id: sender_user_id });
                    console.log("own", own);
                    console.log("own socket.id " + socket.id);
                    if (toUser) {
                        io.to(socket.id).to(toUser.socket_id).emit("answer-new-message", {
                            sender_user_id, user_id, id: newMessage.data.id, date: newMessage.data.date, text: messageText.data.text
                        });
                    }
                }
            }
        }));
    }
    catch (error) {
        console.log(error);
    }
};
