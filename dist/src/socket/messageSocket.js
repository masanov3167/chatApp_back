"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io, socket) => {
    try {
        socket.on("message", function incoming(message) {
            console.log(message);
            io.emit("answer-message", `${message} ga serverdan javob`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
