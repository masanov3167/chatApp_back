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
const messageSocket_1 = __importDefault(require("./messageSocket"));
const OrmFn_1 = require("../utils/OrmFn");
const online_users_entity_1 = __importDefault(require("../entities/online.users.entity"));
const functions_1 = require("../utils/functions");
exports.default = (io) => {
    io.on('connection', (socket) => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            let token = socket.handshake.auth.token;
            if (!token) {
                socket.emit("exit");
            }
            else {
                const decodedUser = (0, functions_1.decoderToken)(token);
                if (decodedUser) {
                    const user = yield (0, OrmFn_1.findOne)(online_users_entity_1.default, { socket_id: socket.id });
                    if (!user) {
                        yield (0, OrmFn_1.insert)(online_users_entity_1.default, { socket_id: socket.id, user_id: decodedUser.id });
                    }
                }
            }
        }))();
        (0, messageSocket_1.default)(io, socket);
        socket.on("disconnect", () => {
            (() => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, OrmFn_1.destroyer)(online_users_entity_1.default, { socket_id: socket.id });
            }))();
        });
    });
};
