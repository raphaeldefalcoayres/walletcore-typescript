"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientFakeBuilder = void 0;
const chance_1 = require("chance");
const client_1 = require("./client");
class ClientFakeBuilder {
    constructor(countObjs = 1) {
        this._uuid = undefined;
        this._name = (_index) => this.chance.word();
        this._email = (_index) => this.chance.email();
        this._created_at = undefined;
        this._updated_at = undefined;
        this.countObjs = countObjs;
        this.chance = (0, chance_1.Chance)();
    }
    static aClient() {
        return new ClientFakeBuilder();
    }
    static theCategories(countObjs) {
        return new ClientFakeBuilder(countObjs);
    }
    withUUID(valueOrFactory) {
        this._uuid = valueOrFactory;
        return this;
    }
    withName(valueOrFactory) {
        this._name = valueOrFactory;
        return this;
    }
    withInvalidNameEmpty(value) {
        this._name = value;
        return this;
    }
    withInvalidNameNotAString(value) {
        this._name = value !== null && value !== void 0 ? value : 5;
        return this;
    }
    withInvalidNameTooLong(value) {
        this._name = value !== null && value !== void 0 ? value : this.chance.word({ length: 256 });
        return this;
    }
    withEmail(valueOrFactory) {
        this._email = valueOrFactory;
        return this;
    }
    withInvalidEmailNotAString(value) {
        this._email = value !== null && value !== void 0 ? value : 5;
        return this;
    }
    withCreatedAt(valueOrFactory) {
        this._created_at = valueOrFactory;
        return this;
    }
    withUpdatedAt(valueOrFactory) {
        this._updated_at = valueOrFactory;
        return this;
    }
    build() {
        const categories = new Array(this.countObjs).fill(undefined).map((_, index) => new client_1.default(Object.assign({ name: this.callFactory(this._name, index), email: this.callFactory(this._email, index) }, (this._created_at && {
            created_at: this.callFactory(this._created_at, index),
        })), !this._uuid ? undefined : this.callFactory(this._uuid, index)));
        return this.countObjs === 1 ? categories[0] : categories;
    }
    get uuid() {
        return this.getValue("uuid");
    }
    get name() {
        return this.getValue("name");
    }
    get email() {
        return this.getValue("email");
    }
    get created_at() {
        return this.getValue("created_at");
    }
    get updated_at() {
        return this.getValue("updated_at");
    }
    getValue(prop) {
        const optional = ["uuid", "created_at"];
        const privateProp = `_${prop}`;
        if (!this[privateProp] && optional.includes(prop)) {
            throw new Error(`Property ${prop} not have a factory, use 'with' methods`);
        }
        return this.callFactory(this[privateProp], 0);
    }
    callFactory(factoryOrValue, index) {
        return typeof factoryOrValue === "function"
            ? factoryOrValue(index)
            : factoryOrValue;
    }
}
exports.ClientFakeBuilder = ClientFakeBuilder;
