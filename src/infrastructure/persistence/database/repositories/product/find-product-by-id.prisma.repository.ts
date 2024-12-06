import { FindProductByIdRepository } from '@application/repositories/product'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { Identifier } from '@common/interfaces'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindProductByIdPrismaRepository
  implements FindProductByIdRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findById(pathParameters: Identifier): Promise<Product | null> {
    try {
      const findProduct = await this.prisma.product.findFirst({
        where: {
          id: pathParameters.id
        }
      })

      // return !findProduct
      //   ? null
      //   : ProductAndCategoryMap.execute(findProduct, findProduct.category)

      //@ts-ignore
      return findProduct ? findProduct : null
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.Product)
      )
    }
  }
}
