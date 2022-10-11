import { ClientRepository } from "../../domain/repository/client.repository";
import { default as DefaultUseCase } from "../../../shared/usecases/use-case";

export namespace DeleteClientUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clientRepository: ClientRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      await this.clientRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };

  type Output = void;
}

export default DeleteClientUseCase;
