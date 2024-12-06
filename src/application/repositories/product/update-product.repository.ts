import { Repositories } from '@application/repositories/common'
import { UpdateRepository } from '@common/types'
import { Product } from '@domain/entities'

export interface UpdateProductRepository
  extends Omit<Repositories<Product | null>, UpdateRepository> {}
