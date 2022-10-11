"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const entity_1 = require("./entity");
const uuid_1 = require("uuid");
class StubEntity extends entity_1.default {
}
describe("Entity Unit Tests", () => {
    it("should set props and id", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const entity = new StubEntity(arrange);
        expect(entity.props).toStrictEqual(arrange);
        expect((0, uuid_1.validate)(entity.id)).toBeTruthy();
    });
    it("should accept a valid uuid", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const uuid = "2f8453f4-6e42-4742-bb91-c1b5caa2ddce";
        const entity = new StubEntity(arrange, uuid);
        expect(entity.id).toBe(uuid);
    });
    it("should convert an entity to a JavaScript Object", () => {
        const arrange = { prop1: "prop1 value", prop2: 10 };
        const uuid = "2f8453f4-6e42-4742-bb91-c1b5caa2ddce";
        const entity = new StubEntity(arrange, uuid);
        expect(entity.toJSON()).toStrictEqual(Object.assign({ id: entity.id }, arrange));
    });
});
