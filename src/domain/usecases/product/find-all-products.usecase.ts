import { PaginationAndFilter } from '@common/interfaces'
import { PaginateResponse } from '@common/types'
import { ProductEntity } from '@domain/entities'

export interface FindAllProductsUseCase {
  execute(
    queryParameters: PaginationAndFilter
  ): Promise<PaginateResponse<ProductEntity>>
}
