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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientValidatorFactory = exports.ClientValidator = exports.ClientRules = void 0;
const class_validator_1 = require("class-validator");
const class_validator_fields_1 = require("../../../shared/validators/class-validator-fields");
class ClientRules {
    constructor({ name, email, created_at, updated_at }) {
        Object.assign(this, { name, email, created_at, updated_at });
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], ClientRules.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], ClientRules.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ClientRules.prototype, "created_at", void 0);
__decorate([
    (0, class_validator_1.IsDate)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Date)
], ClientRules.prototype, "updated_at", void 0);
exports.ClientRules = ClientRules;
class ClientValidator extends class_validator_fields_1.default {
    validate(data) {
        return super.validate(new ClientRules(data !== null && data !== void 0 ? data : {}));
    }
}
exports.ClientValidator = ClientValidator;
class ClientValidatorFactory {
    static create() {
        return new ClientValidator();
    }
}
exports.ClientValidatorFactory = ClientValidatorFactory;
exports.default = ClientValidatorFactory;
