"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_validator_1 = require("../validators/client.validator");
const errors_1 = require("../../../shared/errors");
const entity_1 = require("../../../shared/entities/entity");
class Client extends entity_1.default {
    constructor(props, id) {
        var _a, _b;
        super(props, id);
        this.props = props;
        Client.validate(props);
        this.props.created_at = (_a = this.created_at) !== null && _a !== void 0 ? _a : new Date();
        this.props.updated_at = (_b = this.updated_at) !== null && _b !== void 0 ? _b : new Date();
    }
    update(name, email) {
        Client.validate({
            name,
            email,
        });
        this.name = name;
        this.email = email;
    }
    get name() {
        return this.props.name;
    }
    get email() {
        return this.props.email;
        return this.props.email;
    }
    get created_at() {
        return this.props.created_at;
    }
    get updated_at() {
        return this.props.updated_at;
    }
    set name(value) {
        this.props.name = value;
    }
    set email(value) {
        this.props.email = value;
    }
    static validate(props) {
        const validator = client_validator_1.default.create();
        const isValid = validator.validate(props);
        if (!isValid) {
            throw new errors_1.EntityValidationError(validator.errors);
        }
    }
}
exports.default = Client;
