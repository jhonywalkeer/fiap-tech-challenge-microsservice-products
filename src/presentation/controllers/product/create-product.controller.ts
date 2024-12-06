import { CreateProductDTO } from '@application/dtos/product'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ProductEntity } from '@domain/entities'
import { CreateProductUseCase } from '@domain/usecases/product'

export class CreateProductController implements Controller<ProductEntity> {
  constructor(
    private readonly createProductUC: CreateProductUseCase,
    private readonly createProductPresenter: ResponseHandler<ProductEntity>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[CreateProductController.handle]')

    const { name, description, category_id, price, size } = request.body
    const payload: CreateProductDTO = Object.assign(
      new CreateProductDTO(name, description, category_id, price, size)
    )
    const product: ProductEntity = await this.createProductUC.execute(payload)
    return this.createProductPresenter.response(product, StatusCode.Created)
  }
}
