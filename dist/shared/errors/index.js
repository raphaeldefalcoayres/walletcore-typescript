"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadEntityError = exports.NotFoundError = exports.EntityValidationError = exports.ValidationError = void 0;
class ValidationError extends Error {
}
exports.ValidationError = ValidationError;
class EntityValidationError extends Error {
    constructor(error) {
        super("Entity Validation Error");
        this.error = error;
        this.name = "EntityValidationError";
    }
}
exports.EntityValidationError = EntityValidationError;
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = "NotFoundError";
    }
}
exports.NotFoundError = NotFoundError;
class LoadEntityError extends Error {
    constructor(error, message) {
        super(message !== null && message !== void 0 ? message : "An entity not be loaded");
        this.error = error;
        this.name = "LoadEntityError";
    }
}
exports.LoadEntityError = LoadEntityError;
