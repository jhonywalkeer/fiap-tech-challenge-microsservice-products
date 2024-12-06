import { CreatedCategoryMock } from '@mocks/categories'
import { InputProductMock, InputProductParamMock } from '@mocks/products'

export const FindProductByIdMock = { id: InputProductParamMock }

export const FindedProductByIdMock = {
  ...InputProductMock,
  category: CreatedCategoryMock
}
