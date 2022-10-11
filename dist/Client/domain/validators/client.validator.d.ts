import { ClientProperties } from "../entities/client";
import ClassValidatorFields from "../../../shared/validators/class-validator-fields";
export declare class ClientRules {
    name: string;
    email: string;
    created_at: Date;
    updated_at: Date;
    constructor({ name, email, created_at, updated_at }: ClientProperties);
}
export declare class ClientValidator extends ClassValidatorFields<ClientRules> {
    validate(data: ClientProperties): boolean;
}
export declare class ClientValidatorFactory {
    static create(): ClientValidator;
}
export default ClientValidatorFactory;
