"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_entity_1 = __importDefault(require("../../entities/users.entity"));
const errorHandler_1 = require("../../utils/errorHandler");
const getCustomParams_1 = __importDefault(require("../../utils/getCustomParams"));
const validate_1 = __importDefault(require("./validate"));
const SuccessResponse_1 = __importDefault(require("../../utils/SuccessResponse"));
const OrmFn_1 = require("../../utils/OrmFn");
const validationError_1 = __importDefault(require("../../utils/validationError"));
const envconfig_1 = __importDefault(require("../../config/envconfig"));
const notFoundResponse_1 = __importDefault(require("../../utils/notFoundResponse"));
const get = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield (0, OrmFn_1.findAll)(users_entity_1.default, {}, undefined, { id: "DESC" });
    (0, SuccessResponse_1.default)(res, users, next);
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, OrmFn_1.findOne)(users_entity_1.default, { id: Number(req.params.id) });
    if (data) {
        (0, SuccessResponse_1.default)(res, data, next);
    }
    else {
        (0, notFoundResponse_1.default)(next);
    }
});
const getMe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, OrmFn_1.findOne)(users_entity_1.default, { id: Number(req.params.id) });
    if (data) {
        (0, SuccessResponse_1.default)(res, data, next);
    }
    else {
        (0, notFoundResponse_1.default)(next);
    }
});
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validate_1.default.login(req.body);
    if (error) {
        (0, validationError_1.default)(res, error, next);
        return;
    }
    const user = yield (0, OrmFn_1.findOne)(users_entity_1.default, { login: value.login });
    if (!user) {
        return next(new errorHandler_1.ErrorHandler("Login yoki parol xato", 400));
    }
    const isValid = bcryptjs_1.default.compareSync(value.parol, user.parol);
    if (!isValid) {
        return next(new errorHandler_1.ErrorHandler("Login yoki parol xato", 400));
    }
    const token = jsonwebtoken_1.default.sign(Object.assign({}, user), envconfig_1.default.jwt_secret_key);
    (0, SuccessResponse_1.default)(res, Object.assign(Object.assign({}, user), { token }), next);
});
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validate_1.default.register(req.body);
    if (error) {
        (0, validationError_1.default)(res, error, next);
        return;
    }
    const user = yield (0, OrmFn_1.findOne)(users_entity_1.default, { login: value.login });
    if (user) {
        return next(new errorHandler_1.ErrorHandler(`${value.login} loginli foydalanuvchi avvaldan mavjud`));
    }
    const salt = bcryptjs_1.default.genSaltSync(10);
    value.parol = bcryptjs_1.default.hashSync(value.parol, salt);
    console.log(value);
    const newUser = yield (0, OrmFn_1.insert)(users_entity_1.default, value);
    if (newUser.ok) {
        return (0, SuccessResponse_1.default)(res, newUser.data, next);
    }
    else {
        return next(new errorHandler_1.ErrorHandler(newUser.msg, 500));
    }
});
const put = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, value } = validate_1.default.put(req.body);
    if (error) {
        (0, validationError_1.default)(res, error, next);
        return;
    }
    const updated = yield (0, OrmFn_1.update)(users_entity_1.default, { id: Number(req.params.id) }, value);
    if (!updated.ok) {
        return next(new errorHandler_1.ErrorHandler(updated.msg, 404));
    }
    (0, SuccessResponse_1.default)(res, updated.data, next);
});
exports.default = {
    get: (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(_, res, next, get);
    }),
    getById: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(req, res, next, getById);
    }),
    login: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(req, res, next, login);
    }),
    register: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(req, res, next, register);
    }),
    put: (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        (0, getCustomParams_1.default)(req, res, next, put);
    }),
};
