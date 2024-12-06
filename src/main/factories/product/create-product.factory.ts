import { CreateProductUC } from '@application/usecases/product'
import { ProductEntity } from '@domain/entities'
import { SendEventGateway } from '@infrastructure/gateways/queues'
import { PollEventGateway } from '@infrastructure/gateways/queues/poll-event.gateway'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import {
  CreateProductPrismaRepository,
  FindProductByConditionPrismaRepository
} from '@infrastructure/persistence/database/repositories/product'
import { PollQueueAdapter } from '@main/adapters/queues/pollers'
import { SendMessageAdapter } from '@main/adapters/queues/producers'
import { CreateProductController } from '@presentation/controllers/product'
import { HttpGenericResponse } from '@presentation/helpers'

export const CreateProductControllerFactory = () => {
  const databaseConnection = new DatabaseConnection()
  const sendMessageAdapter = new SendMessageAdapter()
  const sendEvent = new SendEventGateway(sendMessageAdapter)
  const createProductRepository = new CreateProductPrismaRepository(
    databaseConnection
  )
  const findProductByConditionRepository =
    new FindProductByConditionPrismaRepository(databaseConnection)
  const findCategoryByIdUseCase = new FindCategoryByIdUC(sendEvent, pollEvent)
  const createProductUseCase = new CreateProductUC(
    findProductByConditionRepository,
    findCategoryByIdUseCase,
    createProductRepository
  )
  const genericSucessPresenter = new HttpGenericResponse<ProductEntity>()
  const createProductController = new CreateProductController(
    createProductUseCase,
    genericSucessPresenter
  )

  return {
    databaseConnection,
    createProductRepository,
    createProductUseCase,
    createProductController
  }
}
