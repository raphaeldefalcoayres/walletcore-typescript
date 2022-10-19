import { IsDate, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { AccountProperties } from "../entities/account";
import ClassValidatorFields from "#shared/validators/class-validator-fields";
import Client from "#client/domain/entities/client";

export class AccountRules {
  @IsNotEmpty()
  client: Client;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  balance: number;

  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({ client, balance, created_at, updated_at }: AccountProperties) {
    Object.assign(this, { client, balance, created_at, updated_at });
  }
}

export class AccountValidator extends ClassValidatorFields<AccountRules> {
  validate(data: AccountProperties): boolean {
    return super.validate(new AccountRules(data ?? ({} as any)));
  }
}

export class AccountValidatorFactory {
  static create() {
    return new AccountValidator();
  }
}

export default AccountValidatorFactory;
