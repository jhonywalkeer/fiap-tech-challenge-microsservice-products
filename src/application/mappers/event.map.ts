import { QueueParams } from '@common/interfaces'

export class EventMap {
  static execute(
    queue: string,
    uniqueId: string,
    eventId: string,
    data: any
  ): QueueParams {
    return {
      queue,
      message: JSON.stringify({
        requestId: uniqueId,
        type: eventId,
        data: data ?? {}
      }),
      message_group_id: eventId,
      message_deduplication_id: uniqueId,
      message_id: eventId
    }
  }
}
