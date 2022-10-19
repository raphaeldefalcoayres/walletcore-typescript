import Account from "#account/domain/entities/account";
import Transaction from "#transaction/domain/entities/transaction";

export type TransactionOutput = {
  id: string;
  props?: {
    accountFrom: Account;
    accountTo: Account;
    amount: number;
    created_at: Date;
  };
};

export class TransactionOutputMapper {
  static toOutput(entity: Transaction): TransactionOutput {
    return entity.toJSON();
  }
}
