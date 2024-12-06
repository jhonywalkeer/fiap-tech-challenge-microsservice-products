import { ProductAndCategoryMap } from '@application/mappers'
import { FindAllProductRepository } from '@application/repositories/product'
import { ErrorName, Operation, StatusCode } from '@common/enums'
import { NotOccurredError } from '@common/errors'
import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { HttpException } from '@common/utils/exceptions'
import { PaginationFilter } from '@common/utils/filters'
import { Product } from '@domain/entities'
import { Field } from '@domain/enums'
import { DatabaseConnection } from '@infrastructure/persistence/database'

export class FindAllProductsPrismaRepository
  implements FindAllProductRepository
{
  constructor(private readonly prisma: DatabaseConnection) {}

  async findAll(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<Product> | null> {
    try {
      const findProduct = await this.prisma.product.findMany({
        include: { category: true },
        ...PaginationFilter(queryParameters.page, queryParameters.limit)
      })
      const countProducts = await this.prisma.product.count()
      return !findProduct || findProduct.length === 0
        ? null
        : {
            total: countProducts,
            page: queryParameters.page,
            total_pages: Math.ceil(countProducts / queryParameters.limit),
            limit: queryParameters.limit,
            data: findProduct.map((product) => {
              return ProductAndCategoryMap.execute(product, product.category)
            })
          }
    } catch (error) {
      throw new HttpException(
        StatusCode.InternalServerError,
        ErrorName.InternalError,
        NotOccurredError(Operation.Find, Field.Product)
      )
    }
  }
}
