import { Field, Size } from '@domain/enums'
import { InputProductBodyMock } from '@mocks/products'

export const ProductStringPropsAssert = [
  {
    prop: 'name',
    field: Field.Name,
    type: 'string',
    input: {
      name: 1 as any,
      description: InputProductBodyMock.description,
      category_id: InputProductBodyMock.category_id,
      price: InputProductBodyMock.price,
      size: InputProductBodyMock.size as Size
    }
  },
  {
    prop: 'description',
    field: Field.Description,
    type: 'string',
    input: {
      name: InputProductBodyMock.name,
      description: 1 as any,
      category_id: InputProductBodyMock.category_id,
      price: InputProductBodyMock.price,
      size: InputProductBodyMock.size as Size
    }
  },
  {
    prop: 'category id',
    field: Field.CategoryIdentifier,
    type: 'string',
    input: {
      name: InputProductBodyMock.name,
      description: InputProductBodyMock.description,
      category_id: 1 as any,
      price: InputProductBodyMock.price,
      size: InputProductBodyMock.size as Size
    }
  }
]
