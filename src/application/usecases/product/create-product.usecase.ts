import { CategoryEventMap } from '@application/mappers'
import { Gateway } from '@application/protocols/http'
import {
  CreateProductRepository,
  FindProductByConditionRepository
} from '@application/repositories/product'
import { Queue } from '@common/constants'
import { StatusCode, ErrorName, Operation } from '@common/enums'
import { ExistsError, NotOccurredError } from '@common/errors'
import { QueueResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity, ProductEntity } from '@domain/entities'
import { CategoryEvents, Field } from '@domain/enums'
import { CreateProduct } from '@domain/interfaces/product'
import { CreateProductUseCase } from '@domain/usecases/product'

export class CreateProductUC implements CreateProductUseCase {
  constructor(
    private readonly findProductByConditionRepository: FindProductByConditionRepository,
    private readonly sendEvent: Gateway<CategoryEntity>,
    private readonly readMessage: Gateway<QueueResponse<CategoryEntity>>,
    private readonly createProductRepository: CreateProductRepository
  ) {}
  async execute(payload: CreateProduct): Promise<ProductEntity> {
    Logger.info('[CreateProductUC.execute]')

    const findProduct: ProductEntity[] | null =
      await this.findProductByConditionRepository.findByCondition(payload)

    if (findProduct) {
      const message: string = ExistsError(Field.Product)
      Logger.error(
        `[CreateProductUC.execute] Status Code: ${StatusCode.Conflict} | ${message}`
      )
      throw new HttpException(
        StatusCode.Conflict,
        ErrorName.ResourceAlreadyExists,
        ExistsError(Field.Product)
      )
    }

    Logger.info(
      `[CreateProductUC.execute] Comunicating with ${Queue.Category.Name}`
    )

    const findCategory: CategoryEntity = await this.sendEvent.execute(
      CategoryEventMap.execute(Queue.Category.Name, CategoryEvents.FindById, {
        id: payload.category_id
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

    return await this.createProductRepository.create({
      ...payload,
      category: findedCategory
    })
  }
}
