import { Identifier } from '@common/interfaces'
import { ProductEntity } from '@domain/entities'

export interface FindProductByIdUseCase {
  execute(pathParameters: Identifier): Promise<ProductEntity>
}
