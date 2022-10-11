import { ClientRepository } from "../../domain/repository/client.repository";
import { default as DefaultUseCase } from "../../../shared/usecases/use-case";
export declare namespace DeleteClientUseCase {
    export class UseCase implements DefaultUseCase<Input, Output> {
        private clientRepository;
        constructor(clientRepository: ClientRepository.Repository);
        execute(input: Input): Promise<Output>;
    }
    export type Input = {
        id: string;
    };
    type Output = void;
    export {};
}
export default DeleteClientUseCase;
