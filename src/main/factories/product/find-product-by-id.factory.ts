import { FindProductByIdUC } from '@application/usecases/product'
import { Product } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindProductByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { FindProductByIdController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/helpers'

export const FindProductByIdControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const productRepository = new FindProductByIdPrismaRepository(
    databaseConnection
  )
  const findProductByIdUseCase = new FindProductByIdUC(productRepository)
  const genericSucessPresenter = new HttpGenericResponse<Product>()
  const findProductByIdController = new FindProductByIdController(
    findProductByIdUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    findProductByIdUseCase,
    findProductByIdController
  }
}
