import { ProductEntity } from '@domain/entities'
import { UpdateProduct } from '@domain/interfaces/product'

export interface UpdateProductUseCase {
  execute(payload: UpdateProduct): Promise<ProductEntity>
}
