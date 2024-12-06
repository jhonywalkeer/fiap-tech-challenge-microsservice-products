import { CategoryEventMap, ProductAndCategoryMap } from '@application/mappers'
import { Gateway } from '@application/protocols/http'
import { FindAllProductRepository } from '@application/repositories/product'
import { Queue } from '@common/constants'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse, QueueResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { CategoryEntity, ProductEntity } from '@domain/entities'
import { CategoryEvents, Field } from '@domain/enums'
import { FindAllProductsUseCase } from '@domain/usecases/product'

export class FindAllProductsUC implements FindAllProductsUseCase {
  constructor(
    private readonly findAllProductsRepository: FindAllProductRepository,
    private readonly sendEvent: Gateway<CategoryEntity[]>,
    private readonly readMessage: Gateway<QueueResponse<CategoryEntity>>
  ) {}
  async execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<ProductEntity>> {
    Logger.info('[FindAllProductsUC.execute]')

    const findProducts: PaginateResponse<ProductEntity> | null =
      await this.findAllProductsRepository.findAll(queryParameters)

    if (!findProducts) {
      const message: string = NotOccurredError(Operation.Find, Field.Product)
      Logger.error(
        `[FindAllProductsUC.execute] Status Code: ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    Logger.info(
      `[FindAllProductsUC.execute] Comunicating with ${Queue.Category.Name}`
    )

    const categoryIds = findProducts.data.map((product) => product.category!.id)
    const findCategory = await Promise.all(
      categoryIds.map((id) =>
        this.sendEvent.execute(
          CategoryEventMap.execute(
            Queue.Category.Name,
            CategoryEvents.FindById,
            { id }
          )
        )
      )
    )

    Logger.info(
      `[FindAllProductsUC.execute] Reading message from ${Queue.Product.Name}, where we get: ${!findCategory ? 'sucess' : 'error'}`
    )

    const responses = await Promise.all(
      categoryIds.map(() => this.readMessage.execute(Queue.Product.Name))
    )

    const categories = responses
      .map((response) => response?.data)
      .filter((category) => category)

    if (!categories || categories.length === 0) {
      const message: string = NotOccurredError(Operation.Find, Field.Category)
      Logger.error(
        `[FindAllProductsUC.execute] Status Code ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }

    const findedProducts = findProducts.data.map((product) => ({
      ...product,
      category: categories.find((cat) => cat.id === product.category!.id)
    }))

    const productsWithCategories: PaginateResponse<ProductEntity> = {
      total: findProducts.total,
      page: findProducts.page,
      total_pages: findProducts.total_pages,
      limit: findProducts.limit,
      data: ProductAndCategoryMap.execute(findedProducts)
    }

    return productsWithCategories
  }
}
