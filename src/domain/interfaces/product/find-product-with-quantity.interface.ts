import { CreateProduct } from './create-product.interface'

export interface FindProductWithQuantity {
  product_id: string
  quantity: number
  product?: CreateProduct[]
}
