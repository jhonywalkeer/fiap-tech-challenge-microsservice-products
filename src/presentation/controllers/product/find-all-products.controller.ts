import { FindAllProductsDTO } from '@application/dtos/product'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { Logger } from '@common/utils/loggers'
import { ProductEntity } from '@domain/entities'
import { FindAllProductsUseCase } from '@domain/usecases/product'

export class FindAllProductsController
  implements Controller<PaginateResponse<ProductEntity>>
{
  constructor(
    private readonly findAllProductUC: FindAllProductsUseCase,
    private readonly findAllProductPresenter: ResponseHandler<
      PaginateResponse<ProductEntity>
    >
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[FindAllProductsController.handle]')

    const { query } = request
    const products: PaginateResponse<ProductEntity> =
      await this.findAllProductUC.execute(
        Object.assign(new FindAllProductsDTO(query.page, query.limit))
      )
    return this.findAllProductPresenter.response(products, StatusCode.Sucess)
  }
}
