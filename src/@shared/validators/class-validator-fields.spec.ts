import ClassValidatorFields from "./class-validator-fields";
import * as libClassValidator from "class-validator";
import { IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";

class StubClassValidatorFieldsIntegration extends ClassValidatorFields<StubRules> {
  validate(data: any): boolean {
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
    expect(validator.validatedData).toStrictEqual(
      new StubRules({
        name: "some value",
        price: 5,
      })
    );
  });
});

class StubClassValidatorFieldsUnit extends ClassValidatorFields<{
  field: string;
}> {}

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
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  constructor(data: any) {
    Object.assign(this, data);
  }
}
