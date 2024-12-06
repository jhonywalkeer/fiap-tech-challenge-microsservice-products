import { DeleteProductRepository } from '@application/repositories/product'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class DeleteProductPrismaRepository implements DeleteProductRepository {
  constructor(private readonly prisma: DatabaseConnection) {}

  async delete(pathParameters: Identifier): Promise<void> {
    try {
      await this.prisma.product.delete({
        where: {
          id: pathParameters.id
        }
      })
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Delete, Field.Product)
      )
    }
  }
}
