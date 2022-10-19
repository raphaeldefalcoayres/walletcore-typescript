import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
} from "class-validator";
import { TransactionProperties } from "../entities/transaction";
import ClassValidatorFields from "#shared/validators/class-validator-fields";
import Account from "#account/domain/entities/account";

export class TransactionRules {
  @IsDate()
  @IsOptional()
  created_at: Date;

  @IsNotEmpty()
  @IsObject()
  accountFrom: Account;

  @IsNotEmpty()
  @IsObject()
  accountTo: Account;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  constructor({
    created_at,
    accountFrom,
    accountTo,
    amount,
  }: TransactionProperties) {
    Object.assign(this, { created_at, accountFrom, accountTo, amount });
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
