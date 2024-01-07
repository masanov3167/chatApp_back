"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = __importDefault(require("./index"));
const checkUserToken_1 = require("../../middleware/checkUserToken");
const checkChatId_1 = require("../../middleware/checkChatId");
exports.default = router
    .get("/all", checkUserToken_1.checkUserToken, index_1.default.get)
    .post("/voice", checkUserToken_1.checkUserToken, checkChatId_1.checkChatId, index_1.default.uploadVoice, index_1.default.postVoice);
// .post("/register",  UserController.register)
// .put("/update",  checkUserToken, UserController.put);
