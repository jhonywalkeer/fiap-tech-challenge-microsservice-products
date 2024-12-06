import {
  DeleteProductRepository,
  FindProductByIdRepository
} from '@application/repositories/product'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Logger } from '@common/utils/loggers'
import { ProductEntity } from '@domain/entities'
import { Field } from '@domain/enums'
import { DeleteProductUseCase } from '@domain/usecases/product'

export class DeleteProductUC implements DeleteProductUseCase {
  constructor(
    private readonly findProductByIdRepository: FindProductByIdRepository,
    private readonly deleteProductRepository: DeleteProductRepository
  ) {}
  async execute(pathParameters: Identifier): Promise<void> {
    Logger.info('[DeleteProductUC.execute]')

    const findProduct: ProductEntity | null =
      await this.findProductByIdRepository.findById(pathParameters)

    if (!findProduct) {
      const message: string = NotOccurredError(Operation.Delete, Field.Product)
      Logger.error(
        `[DeleteProductUC.execute] Status Code: ${StatusCode.NotFound} | ${message}`
      )
      throw new HttpException(
        StatusCode.NotFound,
        ErrorName.NotFoundInformation,
        message
      )
    }
    return await this.deleteProductRepository.delete(pathParameters)
  }
}
