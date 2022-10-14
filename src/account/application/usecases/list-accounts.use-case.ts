import { default as DefaultUseCase } from "#shared/usecases/use-case";
import { SearchInputDto } from "#shared/dto/search-input";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "#shared/dto/pagination-output";
import { AccountRepository } from "#account/domain";
import { AccountOutput, AccountOutputMapper } from "../dto";

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private accountRepo: AccountRepository.Repository) {}
    //
    async execute(input: Input): Promise<Output> {
      const params = new AccountRepository.SearchParams(input);
      const searchResult = await this.accountRepo.search(params);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: AccountRepository.SearchResult): Output {
      const items = searchResult.items.map((i) => {
        return AccountOutputMapper.toOutput(i);
      });
      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<AccountOutput>;
}

export default ListCategoriesUseCase;

//request e response http
//dados - Account - dados de saida

//UseCase -> domain

//infra -> domain
