import { AccountRepository } from "#account/domain";
import Account from "#account/domain/entities/account";
import Client from "#client/domain/entities/client";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { AccountOutput, AccountOutputMapper } from "../dto";

export namespace CreateAccountUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private accountRepo: AccountRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Account(input);
      await this.accountRepo.insert(entity);
      return AccountOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    client: Client;
    balance: number;
  };

  export type Output = AccountOutput;
}

export default CreateAccountUseCase;

//dados - Account - dados de saida

//UseCase -> domain

//infra -> domain
