import { CategoryEventMap } from '@application/mappers'
import { Gateway } from '@application/protocols/http'
import { FindProductByIdRepository } from '@application/repositories/product'
import { Queue } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { QueueResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity, ProductEntity } from '@domain/entities'
import { CategoryEvents, Field } from '@domain/enums'
import { FindProductByIdUseCase } from '@domain/usecases/product'

export class FindProductByIdUC implements FindProductByIdUseCase {
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository,
    private readonly sendEvent: Gateway<CategoryEntity>,
    private readonly readMessage: Gateway<QueueResponse<CategoryEntity>>
  ) {}
  async execute(pathParameters: Identifier): Promise<ProductEntity> {
    Logger.info('[FindProductByIdUC.execute]')

    const findProduct =
      await this.findProductByIdRepository.findById(pathParameters)

    if (!findProduct) {
      const message: string = NotOccurredError(Operation.Find, Field.Product)
      Logger.error(
        `[FindProductByIdUC] Status Code: ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    Logger.info(`[FindProductByIdUC] Comunicating with ${Queue.Category.Name}`)

    const findCategory: CategoryEntity = await this.sendEvent.execute(
      CategoryEventMap.execute(Queue.Category.Name, CategoryEvents.FindById, {
        id: findProduct.category_id
      })
    )

    Logger.info(
      `[CreateProductUC.execute] Reading message from ${Queue.Product.Name}, where we get: ${!findCategory ? 'sucess' : 'error'}`
    )

    const findedCategory: QueueResponse<CategoryEntity> =
      await this.readMessage.execute(Queue.Product.Name)

    if (!findedCategory) {
      const message: string = NotOccurredError(Operation.Find, Field.Category)
      Logger.error(
        `[CreateProductUC.execute] Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    return findProduct
  }
}
