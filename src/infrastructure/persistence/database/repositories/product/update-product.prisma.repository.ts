import { ProductAndCategoryMap } from '@application/mappers'
import { UpdateProductRepository } from '@application/repositories/product'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { HttpException } from '@common/utils/exceptions'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { UpdateProduct } from '@domain/interfaces/product'
import { DatabaseConnection } from '@infrastructure/persistence/database'
import { FindProductByIdPrismaRepository } from '@infrastructure/persistence/database/repositories/product'

export class UpdateProductPrismaRepository implements UpdateProductRepository {
  constructor(
    private readonly prisma: DatabaseConnection,
    private readonly findProductById: FindProductByIdPrismaRepository
  ) {}

  async update(payload: UpdateProduct): Promise<Product | null> {
    try {
      const update = await this.prisma.product.update({
        where: {
          id: payload.id
        },
        data: {
          name: payload.name,
          price: payload.price,
          category_id: payload.category_id,
          description: payload.description
        }
      })

      const findProduct = await this.findProductById.findById({
        id: update.id
      })

      return ProductAndCategoryMap.execute(findProduct, payload.category)
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Update, Field.Product)
      )
    }
  }
}
