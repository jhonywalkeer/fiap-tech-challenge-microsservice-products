import { UpdateProductDTO } from '@application/dtos/product'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ProductEntity } from '@domain/entities'
import { UpdateProductUseCase } from '@domain/usecases/product'

export class UpdateProductController implements Controller<ProductEntity> {
  constructor(
    private readonly updateProductUC: UpdateProductUseCase,
    private readonly updateProductPresenter: ResponseHandler<ProductEntity>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[UpdateProductController.handle]')

    const { id } = request.params
    const { name, description, price, category_id, size } = request.body
    const parameters: UpdateProductDTO = Object.assign(
      new UpdateProductDTO(id, { name, description, price, category_id, size })
    )
    const product: ProductEntity =
      await this.updateProductUC.execute(parameters)

    return this.updateProductPresenter.response(product, StatusCode.Sucess)
  }
}
