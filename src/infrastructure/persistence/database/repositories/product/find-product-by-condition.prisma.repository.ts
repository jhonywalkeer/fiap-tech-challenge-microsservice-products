import { FindProductByConditionRepository } from '@application/repositories/product'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { FindProductByCondition } from '@domain/interfaces/product'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindProductByConditionPrismaRepository
  implements FindProductByConditionRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findByCondition(
    pathParameters: FindProductByCondition
  ): Promise<Product[] | null> {
    try {
      const findby = pathParameters.ids
        ? {
            id: {
              in: pathParameters.ids
            }
          }
        : { name: pathParameters.name }

      const findProduct = await this.prisma.product.findMany({
        where: findby
      })

      // return !findProduct || findProduct.length === 0 ? null : findProduct
      //@ts-ignore
      return findProduct.length === 0 ? null : findProduct
    } catch (error) {
      console.error(error)
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.Product)
      )
    }
  }
}
