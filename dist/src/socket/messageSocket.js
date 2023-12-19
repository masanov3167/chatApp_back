"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importDefault(require("ws"));
exports.default = (io, socket) => {
    try {
        socket.on("message", function incoming(message) {
            console.log(message);
            io.clients.forEach(function each(client) {
                if (client.readyState === ws_1.default.OPEN) {
                    client.send(`siz yozgan gap: ${message}`);
                }
            });
            // io.emit("salom", ) 
        });
    }
    catch (error) {
        console.log(error);
    }
};
