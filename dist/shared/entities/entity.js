"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
class Entity {
    constructor(props, id) {
        this.props = props;
        this.uuid = id || (0, uuid_1.v4)();
        this.idValidate();
    }
    idValidate() {
        const isValid = (0, uuid_1.validate)(this.uuid);
        if (!isValid) {
            throw new Error("Id must be a valid UUID v4");
        }
    }
    get id() {
        return this.uuid;
    }
    toJSON() {
        return Object.assign({ id: this.id }, this.props);
    }
}
exports.default = Entity;
