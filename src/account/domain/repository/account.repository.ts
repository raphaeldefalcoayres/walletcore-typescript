import Account from "../entities/account";
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "#shared/repository/repository-contracts";

export namespace AccountRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Account, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Account,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default AccountRepository;
