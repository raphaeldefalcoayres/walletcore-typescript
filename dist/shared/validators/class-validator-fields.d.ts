import ValidatorFieldsInterface, { FieldsErrors } from "./validator-fields-interface";
export declare abstract class ClassValidatorFields<PropsValidated> implements ValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors;
    validatedData: PropsValidated;
    validate(data: any): boolean;
}
export default ClassValidatorFields;
