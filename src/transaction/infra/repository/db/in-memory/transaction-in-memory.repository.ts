import { TransactionRepository } from "#transaction/domain";
import Transaction from "#transaction/domain/entities/transaction";
import {
  InMemorySearchableRepository,
  SortDirection,
} from "#shared/repository";

export class TransactionInMemoryRepository
  extends InMemorySearchableRepository<Transaction>
  implements TransactionRepository.Repository
{
  sortableFields: string[] = ["created_at"];

  protected async applyFilter(
    items: Transaction[],
    filter: TransactionRepository.Filter
  ): Promise<Transaction[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.id === filter;
    });
  }

  protected async applySort(
    items: Transaction[],
    sort: string | null,
    sort_dir: SortDirection | null
  ): Promise<Transaction[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}

export default TransactionInMemoryRepository;
//validação
//implementar uma ordenação, ordenar por created_at
//testar filtro + ordenação
