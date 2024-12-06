import { Size } from '@domain/enums'
import { InputProductBodyMock } from '@mocks/products'

export const ProductUndefinedPropsAssert = [
  {
    prop: 'name',
    input: {
      name: undefined as any,
      description: InputProductBodyMock.description,
      category_id: InputProductBodyMock.category_id,
      price: InputProductBodyMock.price,
      size: InputProductBodyMock.size as Size
    }
  },
  {
    prop: 'description',
    input: {
      name: InputProductBodyMock.name,
      description: undefined as any,
      category_id: InputProductBodyMock.category_id,
      price: InputProductBodyMock.price,
      size: InputProductBodyMock.size as Size
    }
  },
  {
    prop: 'category id',
    input: {
      name: InputProductBodyMock.name,
      description: InputProductBodyMock.description,
      category_id: undefined as any,
      price: InputProductBodyMock.price,
      size: InputProductBodyMock.size as Size
    }
  },
  {
    prop: 'price',
    input: {
      name: InputProductBodyMock.name,
      description: InputProductBodyMock.description,
      category_id: InputProductBodyMock.category_id,
      price: undefined as any,
      size: InputProductBodyMock.size as Size
    }
  },
  {
    prop: 'size',
    input: {
      name: InputProductBodyMock.name,
      description: InputProductBodyMock.description,
      category_id: InputProductBodyMock.category_id,
      price: InputProductBodyMock.price,
      size: undefined as any
    }
  }
]
