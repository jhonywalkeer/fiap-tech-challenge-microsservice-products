import { PrismaClient } from '@prisma/client'

export const ProductSeeds = (orm: PrismaClient) => async () => {
  await orm.product.createMany({
    data: [
      {
        name: 'Produto A',
        description: 'Descrição do produto A',
        price: 10.0,
        category_id: 'cm4c9c8pn000008jlfg7c3gbt',
        size: 'M'
      },
      {
        name: 'Produto B',
        description: 'Descrição do produto B',
        price: 15.0,
        category_id: 'cm4c9f7fd000208jl9me4gj75',
        size: 'S'
      },
      {
        name: 'Produto C',
        description: 'Descrição do produto C',
        price: 12.0,
        category_id: 'cm4c9fna1000308jldihx55l8',
        size: 'F'
      }
    ]
  })
}
