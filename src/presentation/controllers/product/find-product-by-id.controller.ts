import { FindProductByIdDTO } from '@application/dtos/product'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { ProductEntity } from '@domain/entities'
import { FindProductByIdUseCase } from '@domain/usecases/product'

export class FindProductByIdController implements Controller<ProductEntity> {
  constructor(
    private readonly findProductByIdUC: FindProductByIdUseCase,
    private readonly findProductByIdPresenter: ResponseHandler<ProductEntity>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[FindProductByIdController.handle]')

    const { id } = request.params
    const parameters: FindProductByIdDTO = Object.assign(
      new FindProductByIdDTO(id)
    )
    const product: ProductEntity =
      await this.findProductByIdUC.execute(parameters)
    return this.findProductByIdPresenter.response(product, StatusCode.Sucess)
  }
}
