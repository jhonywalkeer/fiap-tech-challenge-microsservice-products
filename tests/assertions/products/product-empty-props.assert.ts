import { EmptyFiller } from '@common/constants'
import { Size } from '@domain/enums'
import { InputProductBodyMock } from '@mocks/products'

export const ProductEmptyPropsAssert = [
  {
    prop: 'name',
    input: {
      name: EmptyFiller,
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
      description: EmptyFiller,
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
      category_id: EmptyFiller,
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
      price: EmptyFiller,
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
      size: EmptyFiller
    }
  }
]
