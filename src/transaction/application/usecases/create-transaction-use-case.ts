import { TransactionRepository } from "#transaction/domain";
import Transaction from "#transaction/domain/entities/transaction";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { TransactionOutput, TransactionOutputMapper } from "../dto";

export namespace CreateTransactionUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transactionRepo: TransactionRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Transaction(input);
      await this.transactionRepo.insert(entity);
      return TransactionOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = TransactionOutput;
}

export default CreateTransactionUseCase;

//dados - Transaction - dados de saida

//UseCase -> domain

//infra -> domain
