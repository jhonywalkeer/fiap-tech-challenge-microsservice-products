import { Repositories } from '@application/repositories/common'
import { FindByIdRepository } from '@common/types'
import { Product } from '@domain/entities'

export interface FindProductByIdRepository
  extends Omit<Repositories<Product | null>, FindByIdRepository> {}
