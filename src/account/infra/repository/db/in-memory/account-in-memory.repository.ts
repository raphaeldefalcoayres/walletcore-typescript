import { AccountRepository } from "#account/domain";
import Account from "#account/domain/entities/account";
import {
  InMemorySearchableRepository,
  SortDirection,
} from "#shared/repository";

export class AccountInMemoryRepository
  extends InMemorySearchableRepository<Account>
  implements AccountRepository.Repository
{
  sortableFields: string[] = ["created_at"];

  protected async applyFilter(
    items: Account[],
    filter: AccountRepository.Filter
  ): Promise<Account[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.id === filter;
    });
  }

  protected async applySort(
    items: Account[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Account[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default AccountInMemoryRepository;
//validação
//implementar uma ordenação, ordenar por created_at
//testar filtro + ordenação
