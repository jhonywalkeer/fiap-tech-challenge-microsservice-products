import { Size } from '@domain/enums'
import { CreatedProductMock } from '@mocks/products'

export const FindAllProductsMock = [
  CreatedProductMock,
  {
    name: 'Produto B',
    description: 'Descrição do producot nomeada como B',
    price: 20.0,
    size: Size.Small,
    id: 'e2ddc8d2-929f-4469-8869-92784911cf09',
    category_id: '7be81574-a299-4ab6-b943-c584b8dee847',
    created_at: new Date(),
    updated_at: new Date()
  }
]

export const FindedAllProductsWithCategories = [
  {
    ...FindAllProductsMock[0],
    category: {
      id: '25097f13-505f-4236-9901-f9998add2b31',
      name: 'Categoria A',
      description: 'Descrição da categoria nomeada como A',
      created_at: new Date(),
      updated_at: new Date()
    }
  },
  {
    ...FindAllProductsMock[1],
    category: {
      id: '7be81574-a299-4ab6-b943-c584b8dee847',
      name: 'Categoria B',
      description: 'Descrição da categoria nomeada como B',
      created_at: new Date(),
      updated_at: new Date()
    }
  }
]

export const FindedAllPaginetedProductsMock = {
  data: FindAllProductsMock,
  total: FindAllProductsMock.length,
  page: 1,
  total_pages: FindAllProductsMock.length,
  limit: 10
}

export const FindedAllPaginetedProductsWithCategoriesMock = {
  data: FindedAllProductsWithCategories,
  total: FindedAllProductsWithCategories.length,
  page: 1,
  total_pages: FindedAllProductsWithCategories.length,
  limit: 10
}
