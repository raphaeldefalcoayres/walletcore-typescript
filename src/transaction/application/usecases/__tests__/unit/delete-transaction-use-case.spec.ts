import Transaction from '#transaction/domain/entities/transaction'
import { TransactionInMemoryRepository } from '#transaction/infra/repository/db/in-memory'
import Client from '#client/domain/entities/client'
import { NotFoundError } from '#shared/errors'
import DeleteTransactionUseCase from '../../delete-transaction.use-case'

describe('DeleteTransactionUseCase Unit Tests', () => {
  let useCase: DeleteTransactionUseCase.UseCase
  let repository: TransactionInMemoryRepository

  beforeEach(() => {
    repository = new TransactionInMemoryRepository()
    useCase = new DeleteTransactionUseCase.UseCase(repository)
  })

  it('should throws error when entity not found', async () => {
    await expect(() => useCase.execute({ id: 'fake id' })).rejects.toThrow(
      new NotFoundError(`Entity Not Found using ID fake id`)
    )
  })

  it('should delete a transaction', async () => {
    const items = [new Transaction({})]
    repository.items = items
    await useCase.execute({
      id: items[0].id,
    })
    expect(repository.items).toHaveLength(0)
  })
})
