"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isEmpty = exports.ValidatorRules = void 0;
const errors_1 = require("../../shared/errors");
class ValidatorRules {
    constructor(value, property) {
        this.value = value;
        this.property = property;
    }
    static values(value, property) {
        return new ValidatorRules(value, property);
    }
    required() {
        if (this.value === null || this.value === undefined || this.value === "") {
            throw new errors_1.ValidationError(`The ${this.property} is required`);
        }
        return this;
    }
    string() {
        if (!isEmpty(this.value) && typeof this.value !== "string") {
            throw new errors_1.ValidationError(`The ${this.property} must be a string`);
        }
        return this;
    }
    maxLength(max) {
        if (!isEmpty(this.value) && this.value.length > max) {
            throw new errors_1.ValidationError(`The ${this.property} must be less or equal than ${max} characters`);
        }
        return this;
    }
    boolean() {
        if (!isEmpty(this.value) && typeof this.value !== "boolean") {
            throw new errors_1.ValidationError(`The ${this.property} must be a boolean`);
        }
        return this;
    }
}
exports.ValidatorRules = ValidatorRules;
function isEmpty(value) {
    return value === undefined || value === null;
}
exports.isEmpty = isEmpty;
exports.default = ValidatorRules;
