"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const joiCustomErrorMessage_1 = __importDefault(require("../../utils/joiCustomErrorMessage"));
class Validate {
    login(data) {
        const schema = joi_1.default.object().keys({
            login: joi_1.default.string()
                .required()
                .max(64)
                .messages((0, joiCustomErrorMessage_1.default)("login")),
            parol: joi_1.default.string()
                .required()
                .max(64)
                .messages((0, joiCustomErrorMessage_1.default)("parol"))
        });
        return schema.validate(data);
    }
    register(data) {
        const schema = joi_1.default.object().keys({
            name: joi_1.default.string()
                .required()
                .max(64)
                .messages((0, joiCustomErrorMessage_1.default)("ism")),
            phone: joi_1.default.string()
                .required()
                .max(64)
                .messages((0, joiCustomErrorMessage_1.default)("telefon raqam")),
            login: joi_1.default.string()
                .required()
                .max(64)
                .messages((0, joiCustomErrorMessage_1.default)("login")),
            parol: joi_1.default.string()
                .required()
                .max(64)
                .messages((0, joiCustomErrorMessage_1.default)("parol"))
        });
        return schema.validate(data);
    }
    put(data) {
        const schema = joi_1.default.object().keys({
            name: joi_1.default.string()
                .max(25)
                .regex(/^[a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}(?: [a-zA-Zа-яА-ЯёЁқҚғҒҳҲʼʻ’'`]{2,20}){0,2}$/)
                .messages((0, joiCustomErrorMessage_1.default)("name")),
            phone: joi_1.default.string()
                .max(15)
                .regex(/^\+998\d{9}$/)
                .messages((0, joiCustomErrorMessage_1.default)("phone")),
            card_num: joi_1.default.string()
                .regex(/^((8600)[0-9]{12}|(9860)[0-9]{12})$/)
                .messages((0, joiCustomErrorMessage_1.default)("card_num")),
            role: joi_1.default.number()
                .valid(1, 2, 3, 4)
                .messages((0, joiCustomErrorMessage_1.default)("role")),
        });
        return schema.validate(data);
    }
}
exports.default = new Validate;
