import { FindCategoryByIdUC } from '@application/usecases/category'
import { UpdateProductUC } from '@application/usecases/product'
import { Product } from '@domain/entities'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  FindProductByIdPrismaRepository,
  UpdateProductPrismaRepository
} from '@infrastructure/persistence/database/repositories/product'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { UpdateProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/helpers'

export const UpdateProductControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const sendMessageAdapter = new SendMessageAdapter()
  const gateway = new SendEventGateway(sendMessageAdapter)
  const findProductById = new FindProductByIdPrismaRepository(
    databaseConnection
  )
  const productRepository = new UpdateProductPrismaRepository(
    databaseConnection,
    findProductById
  )
  const findCategoryByIdUseCase = new FindCategoryByIdUC(gateway)
  const updateProductUseCase = new UpdateProductUC(
    findProductById,
    findCategoryByIdUseCase,
    productRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<Product>()
  const updateProductController = new UpdateProductController(
    updateProductUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    productRepository,
    updateProductUseCase,
    updateProductController
  }
}
