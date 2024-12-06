import { CategoryEntity, ProductEntity } from '@domain/entities'

describe('[Entities] Product Entity', () => {
  it('should create a product entity', () => {
    const product = new ProductEntity(
      '1',
      'Product 1',
      'Description of product 1',
      new CategoryEntity('1', 'Category 1', 'Description of category 1'),
      100.0,
      'M'
    )
    expect(product.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Description of product 1')
    expect(product.category.id).toBe('1')
    expect(product.category.name).toBe('Category 1')
    expect(product.category.description).toBe('Description of category 1')
    expect(product.price).toBe(100.0)
    expect(product.size).toBe('M')
    expect(product.create_at).toBeUndefined()
    expect(product.update_at).toBeUndefined()
  })

  it('should create a product entity with dates', () => {
    const now = new Date()
    const product = new ProductEntity(
      '1',
      'Product 1',
      'Description of product 1',
      new CategoryEntity('1', 'Category 1', 'Description of category 1'),
      100.0,
      'M',
      now,
      now
    )
    expect(product.id).toBe('1')
    expect(product.name).toBe('Product 1')
    expect(product.description).toBe('Description of product 1')
    expect(product.category.id).toBe('1')
    expect(product.category.name).toBe('Category 1')
    expect(product.category.description).toBe('Description of category 1')
    expect(product.price).toBe(100.0)
    expect(product.size).toBe('M')
    expect(product.create_at).toBe(now)
    expect(product.update_at).toBe(now)
  })

  it('should update product name, description, price and size', () => {
    const product = new ProductEntity(
      '1',
      'Product 1',
      'Description of product 1',
      new CategoryEntity('1', 'Category 1', 'Description of category 1'),
      100.0,
      'M'
    )
    product.name = 'Product 2'
    product.description = 'Description of product 2'
    product.price = 200.0
    product.size = 'G'

    expect(product.name).toBe('Product 2')
    expect(product.description).toBe('Description of product 2')
    expect(product.price).toBe(200.0)
    expect(product.size).toBe('G')
  })
})
