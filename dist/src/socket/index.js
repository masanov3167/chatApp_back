"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const messageSocket_1 = __importDefault(require("./messageSocket"));
exports.default = (io) => {
    io.on('connection', (socket) => {
        (0, messageSocket_1.default)(io, socket);
    });
};
