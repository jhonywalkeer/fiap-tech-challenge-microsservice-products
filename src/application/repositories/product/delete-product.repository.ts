import { Repositories } from '@application/repositories/common'
import { DeleteRepository } from '@common/types'

export interface DeleteProductRepository
  extends Omit<Repositories<void>, DeleteRepository> {}
