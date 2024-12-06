import { EventMap } from '@application/mappers'
import { QueueParams } from '@common/interfaces'
import { GenerateUUID } from '@common/utils/generators'
import { EventProductIdentifier } from '@common/utils/identifiers'

export class ProductEventMap {
  static execute(
    queue: string,
    eventIdentifier: string,
    data: any
  ): QueueParams {
    const uniqueId = GenerateUUID()
    const eventId = EventProductIdentifier(eventIdentifier)

    return EventMap.execute(queue, uniqueId, eventId, data)
  }
}
