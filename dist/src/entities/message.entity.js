"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const users_entity_1 = __importDefault(require("./users.entity"));
const text_messages_entity_1 = __importDefault(require("./text.messages.entity"));
let Messages = class Messages {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Messages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], Messages.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "number", nullable: false }),
    __metadata("design:type", Number)
], Messages.prototype, "sender_user_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "number", nullable: false }),
    __metadata("design:type", Number)
], Messages.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'sender_user_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.default)
], Messages.prototype, "senderUser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.default),
    (0, typeorm_1.JoinColumn)({ name: 'user_id', referencedColumnName: 'id' }),
    __metadata("design:type", users_entity_1.default)
], Messages.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => text_messages_entity_1.default, textMessage => textMessage.message),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", text_messages_entity_1.default)
], Messages.prototype, "text", void 0);
Messages = __decorate([
    (0, typeorm_1.Entity)({
        name: "chat_messages"
    })
], Messages);
exports.default = Messages;
