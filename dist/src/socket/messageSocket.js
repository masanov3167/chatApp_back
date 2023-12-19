"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io, socket) => {
    try {
        socket.on("message", (msg) => {
            console.log(`Message: ${msg}`);
            io.emit("answer-message", `${msg} ga serverdan javob`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
