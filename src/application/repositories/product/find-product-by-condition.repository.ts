import { Repositories } from '@application/repositories/common'
import { FindByConditionRepository } from '@common/types'
import { Product } from '@domain/entities'

export interface FindProductByConditionRepository
  extends Omit<Repositories<Product[] | null>, FindByConditionRepository> {}
