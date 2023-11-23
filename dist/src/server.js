"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const ErrorHandle_1 = require("./middleware/ErrorHandle");
//express app
const app = (0, express_1.default)();
//set port number
const PORT = process.env.PORT || 5000;
//import routes
const route_1 = __importDefault(require("./controller/users/route"));
const checkUserId_1 = require("./middleware/checkUserId");
//connect
//cors control
app.use((0, cors_1.default)());
//req body parser to json
app.use(express_1.default.json());
//use single routes
app.use("/users", route_1.default);
app.use(checkUserId_1.CheckUserId);
//error handle middleware
app.use(ErrorHandle_1.ErrorHandle);
//404 not found path
app.use("/*", (_, res) => res
    .status(404)
    .json({ ok: false, status: 404, message: `path not found ${_.url}` }));
app.listen(PORT, () => {
    console.log(`server run port ${PORT}`);
});
