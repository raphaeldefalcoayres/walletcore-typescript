import { AccountRepository } from "#account/domain";
import Client from "#client/domain/entities/client";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { UniqueEntityId } from "#shared/value-objects";
import { AccountOutput, AccountOutputMapper } from "../dto";

export namespace UpdateAccountUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private accountRepo: AccountRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.accountRepo.findById(input.id);
      entity.update(input.client, input.balance);

      await this.accountRepo.update(entity);

      return AccountOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: UniqueEntityId;
    client: Client;
    balance: number;
  };

  export type Output = AccountOutput;
}

export default UpdateAccountUseCase;

//dados - Account - dados de saida

//UseCase -> domain

//infra -> domain
