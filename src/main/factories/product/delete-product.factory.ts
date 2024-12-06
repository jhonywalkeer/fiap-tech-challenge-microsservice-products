import { DeleteProductUC } from '@application/usecases/product'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindProductByIdPrismaRepository,
  DeleteProductPrismaRepository
} from '@infrastructure/persistence/database/repositories/product'
import { DeleteProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/helpers'

export const DeleteProductControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const findProductByIdRepository = new FindProductByIdPrismaRepository(
    databaseConnection
  )
  const deleteProductRepository = new DeleteProductPrismaRepository(
    databaseConnection
  )
  const deleteProductUseCase = new DeleteProductUC(
    findProductByIdRepository,
    deleteProductRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<void>()
  const deleteProductController = new DeleteProductController(
    deleteProductUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    findProductByIdRepository,
    deleteProductRepository,
    deleteProductUseCase,
    deleteProductController
  }
}
