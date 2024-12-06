import { ProductEventMap } from '@application/mappers'
import { InputProductParamMock } from '@mocks/products'

describe('[Mappers] Product Event Map', () => {
  it('should generate correct QueueParams', () => {
    const queue = 'test-queue'
    const eventIdentifier = 'find-all-products'
    const data = { productId: InputProductParamMock }

    const result = ProductEventMap.execute(queue, eventIdentifier, data)

    expect(result.queue).toBe(queue)
    expect(result.message).toContain('"type":"find-all-products"')
    expect(result.message).toContain(
      '"data":{"productId":"25097f13-505f-4236-9901-f9998add2b31"}'
    )
    expect(result.message_group_id).toBe('find-all-products')
    expect(result.message_deduplication_id).toBeDefined()
    expect(result.message_id).toBe('find-all-products')
  })

  it('should handle undefined data', () => {
    const queue = 'test-queue'
    const eventIdentifier = 'find-product-by-id'

    const result = ProductEventMap.execute(queue, eventIdentifier, undefined)

    expect(result.message).toContain('"data":{}')
  })

  it('should return unknown event for invalid event identifier', () => {
    const queue = 'test-queue'
    const eventIdentifier = 'invalid-event'
    const data = { userId: 1 }

    const result = ProductEventMap.execute(queue, eventIdentifier, data)

    expect(result.message).toContain('"type":"unknown-event"')
    expect(result.message_group_id).toBe('unknown-event')
    expect(result.message_id).toBe('unknown-event')
  })
})
