"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataSource = void 0;
const typeorm_1 = require("typeorm");
const path_1 = __importDefault(require("path"));
const envconfig_1 = __importDefault(require("./envconfig"));
exports.dataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: envconfig_1.default.db_host,
    port: 5432,
    username: envconfig_1.default.db_user,
    password: envconfig_1.default.db_pass,
    database: envconfig_1.default.db_name,
    synchronize: true,
    entities: [path_1.default.resolve(__dirname, "..", "entities", "*.entity.{ts,js}")],
    // logging: true
});
