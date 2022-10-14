import TransactionValidatorFactory from "../validators/transaction.validator";
import { EntityValidationError } from "#shared/errors";
import Entity from "#shared/entities/entity";

export type TransactionProperties = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
};

export default class Transaction extends Entity<TransactionProperties> {
  constructor(public readonly props: TransactionProperties, id?: string) {
    super(props, id);
    Transaction.validate(props);
    this.props.created_at = this.created_at ?? new Date();
    this.props.updated_at = this.updated_at ?? new Date();
  }

  update(): void {}

  get created_at() {
    return this.props.created_at;
  }

  get updated_at() {
    return this.props.updated_at;
  }

  private set updated_at(value) {
    this.props.updated_at = value;
  }

  static validate(props: TransactionProperties) {
    const validator = TransactionValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }
}
