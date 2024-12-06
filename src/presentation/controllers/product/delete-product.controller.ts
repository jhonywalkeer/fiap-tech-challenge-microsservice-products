import { DeleteProductDTO } from '@application/dtos/product'
import { Controller, ResponseHandler } from '@application/protocols/http'
import { StatusCode } from '@common/enums'
import { HttpRequest } from '@common/interfaces'
import { Logger } from '@common/utils/loggers'
import { DeleteProductUseCase } from '@domain/usecases/product'

export class DeleteProductController implements Controller<void> {
  constructor(
    private readonly deleteProductUC: DeleteProductUseCase,
    private readonly deleteProductPresenter: ResponseHandler<void>
  ) {}
  async handle(request: HttpRequest) {
    Logger.info('[DeleteProductController.handle]')

    const { id } = request.params
    const payload: DeleteProductDTO = Object.assign(new DeleteProductDTO(id))
    const product: void = await this.deleteProductUC.execute(payload)
    return this.deleteProductPresenter.response(product, StatusCode.Accepted)
  }
}
