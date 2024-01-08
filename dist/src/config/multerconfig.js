"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const uuid = require("uuid");
const errorHandler_1 = require("../utils/errorHandler");
const storage = (folderPath, filterRegex) => {
    try {
        const multerStorage = multer_1.default.diskStorage({
            destination: (_, __, cb) => {
                cb(null, path_1.default.join('public', folderPath + '/'));
            },
            filename: (d, file, cb) => {
                cb(null, `${file.fieldname}-${uuid.v4()}${path_1.default.extname(file.originalname)}`);
            },
        });
        const fileFilter = (_, file, cb) => {
            console.log("filter ichida fayl : ", file);
            if (!file.originalname.match(new RegExp(filterRegex))) {
                return cb(new errorHandler_1.ErrorHandler('Faylning tipi noto\'g\'ri'));
            }
            cb(null, true);
        };
        return (0, multer_1.default)({
            storage: multerStorage,
            fileFilter: fileFilter,
        });
    }
    catch (e) {
        console.log("multer config err: ", e);
        return null;
    }
};
exports.default = storage;
