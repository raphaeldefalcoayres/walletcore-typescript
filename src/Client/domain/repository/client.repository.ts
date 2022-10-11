import Client from "../entities/client";
import {
  SearchableRepositoryInterface,
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "#shared/repository/repository-contracts";

export namespace ClientRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Client, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Client,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default ClientRepository;
