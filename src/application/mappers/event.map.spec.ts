import { EventMap } from '@application/mappers'

describe('[Mappers] Event Map', () => {
  it('should generate correct QueueParams', () => {
    const queue = 'test-queue'
    const uniqueId = 'unique-id'
    const eventId = 'event-id'
    const data = { key: 'value' }
    const result = EventMap.execute(queue, uniqueId, eventId, data)

    expect(result.queue).toBe(queue)
    expect(result.message).toContain('"requestId":"unique-id"')
    expect(result.message).toContain('"type":"event-id"')
    expect(result.message).toContain('"data":{"key":"value"}')
    expect(result.message_group_id).toBe(eventId)
    expect(result.message_deduplication_id).toBe(uniqueId)
    expect(result.message_id).toBe(eventId)
  })

  it('should handle undefined data', () => {
    const queue = 'test-queue'
    const uniqueId = 'unique-id'
    const eventId = 'event-id'
    const result = EventMap.execute(queue, uniqueId, eventId, undefined)

    expect(result.message).toContain('"data":{}')
  })
})
