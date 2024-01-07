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
const message_entity_1 = __importDefault(require("./message.entity"));
let VoiceMessages = class VoiceMessages {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], VoiceMessages.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "number", nullable: false }),
    __metadata("design:type", Number)
], VoiceMessages.prototype, "message_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", nullable: false }),
    __metadata("design:type", String)
], VoiceMessages.prototype, "path", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], VoiceMessages.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], VoiceMessages.prototype, "size", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => message_entity_1.default, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'message_id', referencedColumnName: 'id' }),
    __metadata("design:type", message_entity_1.default)
], VoiceMessages.prototype, "message", void 0);
VoiceMessages = __decorate([
    (0, typeorm_1.Entity)({
        name: "chat_voice_messages"
    })
], VoiceMessages);
exports.default = VoiceMessages;
