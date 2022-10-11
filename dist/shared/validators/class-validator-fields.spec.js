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
const class_validator_fields_1 = require("./class-validator-fields");
const libClassValidator = require("class-validator");
const class_validator_1 = require("class-validator");
class StubClassValidatorFieldsIntegration extends class_validator_fields_1.default {
    validate(data) {
        return super.validate(new StubRules(data));
    }
}
describe("ClassValidatorFields Integration Tests", () => {
    it("should validate with errors", () => {
        const validator = new StubClassValidatorFieldsIntegration();
        expect(validator.validate(null)).toBeFalsy();
        expect(validator.errors).toStrictEqual({
            name: [
                "name should not be empty",
                "name must be a string",
                "name must be shorter than or equal to 255 characters",
            ],
            price: [
                "price should not be empty",
                "price must be a number conforming to the specified constraints",
            ],
        });
    });
    it("should be valid", () => {
        const validator = new StubClassValidatorFieldsIntegration();
        expect(validator.validate({ name: "some value", price: 5 })).toBeTruthy();
        expect(validator.validatedData).toStrictEqual(new StubRules({
            name: "some value",
            price: 5,
        }));
    });
});
class StubClassValidatorFieldsUnit extends class_validator_fields_1.default {
}
describe("ClassValidatorFields Unit Tests", () => {
    it("should initialize erros and validatedData variables with null", () => {
        const validator = new StubClassValidatorFieldsUnit();
        expect(validator.errors).toBeNull();
        expect(validator.validatedData).toBeNull();
    });
    it("should validate with errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        spyValidateSync.mockReturnValue([
            { property: "field", constraints: { isRequired: "some error" } },
        ]);
        const validator = new StubClassValidatorFieldsUnit();
        expect(validator.validate(null)).toBeFalsy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toBeNull();
        expect(validator.errors).toStrictEqual({ field: ["some error"] });
    });
    it("should validate without errors", () => {
        const spyValidateSync = jest.spyOn(libClassValidator, "validateSync");
        spyValidateSync.mockReturnValue([]);
        const validator = new StubClassValidatorFieldsUnit();
        expect(validator.validate({ field: "value" })).toBeTruthy();
        expect(spyValidateSync).toHaveBeenCalled();
        expect(validator.validatedData).toStrictEqual({ field: "value" });
        expect(validator.errors).toBeNull();
    });
});
class StubRules {
    constructor(data) {
        Object.assign(this, data);
    }
}
__decorate([
    (0, class_validator_1.MaxLength)(255),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], StubRules.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], StubRules.prototype, "price", void 0);
