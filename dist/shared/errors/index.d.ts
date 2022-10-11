import { FieldsErrors } from "../../shared/validators/validator-fields-interface";
export declare class ValidationError extends Error {
}
export declare class EntityValidationError extends Error {
    error: FieldsErrors;
    constructor(error: FieldsErrors);
}
export declare class NotFoundError extends Error {
    constructor(message: string);
}
export declare class LoadEntityError extends Error {
    error: FieldsErrors;
    constructor(error: FieldsErrors, message?: string);
}
