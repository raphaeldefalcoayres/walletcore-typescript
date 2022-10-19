import { ClientRepository } from "#client/domain";
import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { UniqueEntityId } from "#shared/value-objects";

export namespace DeleteClientUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clientRepository: ClientRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.clientRepository.delete(input.id);
    }
  }

  export type Input = {
    id: UniqueEntityId;
  };

  type Output = void;
}

export default DeleteClientUseCase;
