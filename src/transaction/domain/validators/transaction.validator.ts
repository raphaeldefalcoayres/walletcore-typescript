import { IsDate, IsOptional } from "class-validator";
import { TransactionProperties } from "../entities/transaction";
import ClassValidatorFields from "#shared/validators/class-validator-fields";

export class TransactionRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsDate()
  @IsOptional()
  updated_at: Date;

  constructor({ created_at, updated_at }: TransactionProperties) {
    Object.assign(this, { created_at, updated_at });
  }
}

export class TransactionValidator extends ClassValidatorFields<TransactionRules> {
  validate(data: TransactionProperties): boolean {
    return super.validate(new TransactionRules(data ?? ({} as any)));
  }
}

export class TransactionValidatorFactory {
  static create() {
    return new TransactionValidator();
  }
}

export default TransactionValidatorFactory;
