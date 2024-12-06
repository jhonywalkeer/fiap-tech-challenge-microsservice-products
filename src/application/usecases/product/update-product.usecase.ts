import { CategoryEventMap } from '@application/mappers'
import { Gateway } from '@application/protocols/http'
import {
  FindProductByIdRepository,
  UpdateProductRepository
} from '@application/repositories/product'
import { Queue } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity, ProductEntity } from '@domain/entities'
import { CategoryEvents, Field } from '@domain/enums'
import { UpdateProduct } from '@domain/interfaces/product'
import { UpdateProductUseCase } from '@domain/usecases/product'

export class UpdateProductUC implements UpdateProductUseCase {
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository,
    private readonly sendEvent: Gateway<CategoryEntity>,
    private readonly readMessage: Gateway<CategoryEntity>,
    private readonly updateProductRepository: UpdateProductRepository
  ) {}
  async execute(payload: UpdateProduct): Promise<ProductEntity> {
    Logger.info('[FindProductByIdUC.execute]')

    const findProduct = await this.findProductByIdRepository.findById(payload)

    if (!findProduct) {
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        NotOccurredError(Operation.Find, Field.Product)
      )
    }

    Logger.info(
      `[FindProductByIdUC.execute] Comunicating with ${Queue.Category.Name}`
    )

    const findCategory: CategoryEntity = await this.sendEvent.execute(
      CategoryEventMap.execute(Queue.Category.Name, CategoryEvents.FindById, {
        id: payload.category_id
      })
    )

    Logger.info(
      `[FindProductByIdUC.execute] Reading message from ${Queue.Product.Name}, where we get: ${!findCategory ? 'sucess' : 'error'}`
    )

    const findedCategory: CategoryEntity = await this.readMessage.execute(
      Queue.Product.Name
    )

    if (!findedCategory) {
      const message: string = NotOccurredError(Operation.Find, Field.Category)
      Logger.error(
        `[FindProductByIdUC.execute] Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    const updateProduct = await this.updateProductRepository.update({
      ...payload,
      category: findCategory
    })

    if (!updateProduct) {
      throw new HttpException(
        StatusCode.BadRequest,
        ErrorName.BadRequest,
        NotOccurredError(Operation.Find, Field.Product)
      )
    }

    return updateProduct
  }
}
