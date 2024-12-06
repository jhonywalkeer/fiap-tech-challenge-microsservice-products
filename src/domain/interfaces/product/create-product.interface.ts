import { Size } from '@domain/enums'

import { CreateCategory } from '../category/create-category.interface'

export interface CreateProduct {
  name: string
  description: string
  category_id?: string
  price: number
  size: Size
  category?: CreateCategory
}
