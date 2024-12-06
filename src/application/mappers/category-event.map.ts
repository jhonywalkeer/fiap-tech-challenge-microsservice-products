import { EventMap } from '@application/mappers'
import { QueueParams } from '@common/interfaces'
import { GenerateUUID } from '@common/utils/generators'
import { EventCategoryIdentifier } from '@common/utils/identifiers'

export class CategoryEventMap {
  static execute(
    queue: string,
    eventIdentifier: string,
    data: any
  ): QueueParams {
    const uniqueId = GenerateUUID()
    const eventId = EventCategoryIdentifier(eventIdentifier)

    return EventMap.execute(queue, uniqueId, eventId, data)
  }
}
