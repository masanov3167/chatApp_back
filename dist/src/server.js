"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const ErrorHandle_1 = require("./middleware/ErrorHandle");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const route_1 = __importDefault(require("./controller/users/route"));
const route_2 = __importDefault(require("./controller/messages/route"));
const checkUserId_1 = require("./middleware/checkUserId");
const socket_1 = __importDefault(require("./socket"));
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/users", route_1.default);
app.use("/messages", route_2.default);
app.use(checkUserId_1.CheckUserId);
app.use(ErrorHandle_1.ErrorHandle);
// Creating HTTP server
const server = http_1.default.createServer(app);
// Integrating Socket.IO with the HTTP server
const io = new socket_io_1.Server(server);
// Socket.IO connection handling
(0, socket_1.default)(io);
// Start the server
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
