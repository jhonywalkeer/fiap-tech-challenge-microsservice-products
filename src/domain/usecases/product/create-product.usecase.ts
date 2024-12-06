import { ProductEntity } from '@domain/entities'
import { CreateProduct } from '@domain/interfaces/product'

export interface CreateProductUseCase {
  execute(payload: CreateProduct): Promise<ProductEntity> | never
}
