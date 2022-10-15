import { TransactionRepository } from "#transaction/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";

export namespace DeleteTransactionUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private transactionRepository: TransactionRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.transactionRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };

  type Output = void;
}

export default DeleteTransactionUseCase;
