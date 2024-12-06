import { CategoryEvents } from '@domain/enums'

export const EventCategoryIdentifier = (event: string): string => {
  const eventMap: { [key: string]: string } = {
    'find-all-categories': CategoryEvents.FindAll,
    'find-category-by-id': CategoryEvents.FindById
  }

  return eventMap[event] || CategoryEvents.Unknown
}
