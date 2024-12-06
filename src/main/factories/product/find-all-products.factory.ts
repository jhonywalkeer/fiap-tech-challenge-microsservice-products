import { FindAllProductsUC } from '@application/usecases/product'
import { PaginateResponse } from '@common/types'
import { Product } from '@domain/entities'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindAllProductsPrismaRepository } from '@infrastructure/persistence/database/repositories/product'
import { FindAllProductsController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/helpers'

export const FindAllProductsControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const productRepository = new FindAllProductsPrismaRepository(
    databaseConnection
  )
  const findAllProductsUseCase = new FindAllProductsUC(productRepository)
  const genericSucessPresenter = new HttpGenericResponse<
    PaginateResponse<Product>
  >()
  const findAllProductsController = new FindAllProductsController(
    findAllProductsUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    findAllProductsUseCase,
    findAllProductsController
  }
}
