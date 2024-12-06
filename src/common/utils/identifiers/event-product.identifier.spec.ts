import { EventProductIdentifier } from '@common/utils/identifiers'
import { ProductEvents } from '@domain/enums'

describe('[Identifier] Event Identifier', () => {
  it('should return the correct event identifier for "find-all-categories"', () => {
    const result = EventProductIdentifier('find-all-products')
    expect(result).toBe(ProductEvents.FindAll)
  })

  it('should return the correct event identifier for "find-category-by-id"', () => {
    const result = EventProductIdentifier('find-product-by-id')
    expect(result).toBe(ProductEvents.FindById)
  })

  it('should return CategoryEvents.Unknown for an unknown event', () => {
    const result = EventProductIdentifier('any_other_event')
    expect(result).toBe(ProductEvents.Unknown)
  })
})
