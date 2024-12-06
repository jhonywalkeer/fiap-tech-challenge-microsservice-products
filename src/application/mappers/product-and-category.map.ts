import { ProductEntity } from '@domain/entities'

export class ProductAndCategoryMap {
  static execute(product: ProductEntity[]): ProductEntity[] {
    return product.map((product) => {
      return {
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        size: product.size,
        category: {
          id: product.category!.id,
          name: product.category!.name,
          description: product.category!.description,
          create_at: product.category!.create_at,
          update_at: product.category!.update_at
        },
        create_at: product.create_at,
        update_at: product.update_at
      }
    })
  }
}
