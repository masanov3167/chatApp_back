"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMedia = exports.signToken = exports.decoderToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const envconfig_1 = __importDefault(require("../config/envconfig"));
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
function decoderToken(token) {
    try {
        const result = jsonwebtoken_1.default.verify(token, envconfig_1.default.jwt_secret_key);
        return result;
    }
    catch (error) {
        return false;
    }
}
exports.decoderToken = decoderToken;
function signToken(user) {
    try {
        const token = jsonwebtoken_1.default.sign(Object.assign({}, user), envconfig_1.default.jwt_secret_key, {
            expiresIn: 60 * 60
        });
        return token;
    }
    catch (e) {
        return false;
    }
}
exports.signToken = signToken;
const removeMedia = (file) => {
    try {
        const url = path_1.default.join(__dirname, '..', '..', "..", "public", file);
        (0, fs_1.existsSync)(url) ? (0, fs_1.unlinkSync)(url) : false;
        return true;
    }
    catch (e) {
        console.log("media remove err : ", e);
        return false;
    }
};
exports.removeMedia = removeMedia;
