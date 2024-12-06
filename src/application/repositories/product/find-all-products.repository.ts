import { Repositories } from '@application/repositories/common'
import { FindAllRepository, PaginateResponse } from '@common/types'
import { Product } from '@domain/entities'

export interface FindAllProductRepository
  extends Omit<
    Repositories<PaginateResponse<Product> | null>,
    FindAllRepository
  > {}
