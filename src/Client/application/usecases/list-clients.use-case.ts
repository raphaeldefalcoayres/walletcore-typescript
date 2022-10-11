import { ClientRepository } from "../../domain/repository/client.repository";
import { ClientOutput, ClientOutputMapper } from "../dto/client-output";
import { default as DefaultUseCase } from "../../../shared/usecases/use-case";
import { SearchInputDto } from "../../../shared/dto/search-input";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../../../shared/dto/pagination-output";

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private clientRepo: ClientRepository.Repository) {}
    //
    async execute(input: Input): Promise<Output> {
      const params = new ClientRepository.SearchParams(input);
      const searchResult = await this.clientRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: ClientRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return ClientOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<ClientOutput>;
}

export default ListCategoriesUseCase;

//request e response http
//dados - Client - dados de saida

//UseCase -> domain

//infra -> domain
