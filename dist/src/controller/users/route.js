"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const index_1 = __importDefault(require("./index"));
const CheckId_1 = require("../../middleware/CheckId");
const checkUserId_1 = require("../../middleware/checkUserId");
exports.default = router
    .get("/all", index_1.default.get)
    .get("/id/:id", checkUserId_1.CheckUserId, CheckId_1.CheckId, index_1.default.getById)
    .post("/login", index_1.default.login)
    .post("/register", index_1.default.register)
    .put("/update/:id", checkUserId_1.CheckUserId, CheckId_1.CheckId, index_1.default.put);
