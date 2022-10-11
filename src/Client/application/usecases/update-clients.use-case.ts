import { ClientRepository } from "#client/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { ClientOutput, ClientOutputMapper } from "../dto";

export namespace UpdateClientUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clientRepo: ClientRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.clientRepo.findById(input.id);
      entity.update(input.name, input.email);

      await this.clientRepo.update(entity);

      return ClientOutputMapper.toOutput(entity);
    }
  }

  export type Input = {
    id: string;
    name: string;
    email: string;
  };

  export type Output = ClientOutput;
}

export default UpdateClientUseCase;

//dados - Client - dados de saida

//UseCase -> domain

//infra -> domain
