import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";
import { ClientProperties } from "../entities/client";
import ClassValidatorFields from "../../../shared/validators/class-validator-fields";

export class ClientRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({ name, email, created_at, updated_at }: ClientProperties) {
    Object.assign(this, { name, email, created_at, updated_at });
  }
}

export class ClientValidator extends ClassValidatorFields<ClientRules> {
  validate(data: ClientProperties): boolean {
    return super.validate(new ClientRules(data ?? ({} as any)));
  }
}

export class ClientValidatorFactory {
  static create() {
    return new ClientValidator();
  }
}

export default ClientValidatorFactory;
