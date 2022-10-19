import { AccountRepository } from "#account/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { UniqueEntityId } from "#shared/value-objects";

export namespace DeleteAccountUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private accountRepository: AccountRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.accountRepository.delete(input.id);
    }
  }

  export type Input = {
    id: UniqueEntityId;
  };

  type Output = void;
}

export default DeleteAccountUseCase;
