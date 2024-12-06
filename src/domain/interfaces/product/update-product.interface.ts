import { Identifier } from '@common/interfaces'
import { CreateProduct } from '@domain/interfaces/product'

export interface UpdateProduct extends Identifier {
  name?: CreateProduct['name']
  description?: CreateProduct['description']
  category_id?: CreateProduct['category_id']
  price?: CreateProduct['price']
  size?: CreateProduct['size']
  category?: CreateProduct['category']
}
