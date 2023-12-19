"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io, socket) => {
    try {
        socket.on("message", function incoming(message) {
            console.log(message);
            io.send(`salom text: ${message}`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
