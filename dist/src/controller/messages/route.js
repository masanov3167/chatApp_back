"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = __importDefault(require("./index"));
const checkUserToken_1 = require("../../middleware/checkUserToken");
exports.default = router
    .get("/all", checkUserToken_1.checkUserToken, index_1.default.get);
// .post("/login",  UserController.login)
// .post("/register",  UserController.register)
// .put("/update",  checkUserToken, UserController.put);
