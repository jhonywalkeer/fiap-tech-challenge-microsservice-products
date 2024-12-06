import { DeleteProductUC } from '@application/usecases/product'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindProductByIdPrismaRepository,
  DeleteProductPrismaRepository
} from '@infrastructure/persistence/database/repositories/product'
import { DeleteProductControllerFactory } from '@main/factories/product'
import { DeleteProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/helpers'

jest.mock('@infrastructure/persistence/database')
jest.mock('@infrastructure/persistence/database/repositories/product')
jest.mock('@application/usecases/product')
jest.mock('@presentation/controllers/product')
jest.mock('@presentation/helpers')

describe('[Factories] Delete Product Controller Factory', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create all instances correctly', () => {
    const factoryResult: {
      databaseConnection: DatabaseConnection
      findProductByIdRepository: FindProductByIdPrismaRepository
      deleteProductRepository: DeleteProductPrismaRepository
      deleteProductUseCase: DeleteProductUC
      genericSucessPresenter: HttpGenericResponse<void>
      deleteProductController: DeleteProductController
    } = DeleteProductControllerFactory() as any

    expect(factoryResult.databaseConnection).toBeInstanceOf(DatabaseConnection)
    expect(factoryResult.findProductByIdRepository).toBeInstanceOf(
      FindProductByIdPrismaRepository
    )
    expect(factoryResult.deleteProductRepository).toBeInstanceOf(
      DeleteProductPrismaRepository
    )
    expect(factoryResult.deleteProductUseCase).toBeInstanceOf(DeleteProductUC)
    expect(factoryResult.deleteProductController).toBeInstanceOf(
      DeleteProductController
    )
  })
})
