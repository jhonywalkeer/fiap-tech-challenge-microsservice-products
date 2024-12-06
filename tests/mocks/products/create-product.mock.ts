import { Size } from '@domain/enums'
import { CreatedCategoryMock } from '@mocks/categories'

export const InputProductBodyMock = {
  name: 'Produto A',
  description: 'Descrição do produto A',
  category_id: '25097f13-505f-4236-9901-f9998add2b31',
  price: 10.0,
  size: 'M'
}

export const InputProductMock = {
  name: InputProductBodyMock.name,
  description: InputProductBodyMock.description,
  price: InputProductBodyMock.price,
  size: InputProductBodyMock.size as Size
}

export const InputProductPriceMock = '10.0'

export const InputProductSizeMock = 'K'

export const CreateProductWithCategoryMock = {
  ...InputProductMock,
  category: CreatedCategoryMock
}

export const CreatedProductMock = {
  ...InputProductMock,
  id: '25097f13-505f-4236-9901-f9998add2b31',
  category_id: '25097f13-505f-4236-9901-f9998add2b31',
  create_at: new Date(),
  updated_at: new Date()
}
