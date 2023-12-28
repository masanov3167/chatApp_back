"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (io, socket) => {
    try {
        socket.on("message", (msg) => {
            console.log(`Message: ${msg}`);
            io.emit("answer-message", `${msg} ga serverdan javob`);
        });
        socket.on("new-message", (msg) => {
            console.log("Private msg: ", msg);
            io.emit("answer-new-message", `${msg} ga javob serverdan`);
        });
    }
    catch (error) {
        console.log(error);
    }
};
