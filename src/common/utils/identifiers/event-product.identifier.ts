import { ProductEvents } from '@domain/enums'

export const EventProductIdentifier = (event: string): string => {
  const eventMap: { [key: string]: string } = {
    'find-all-products': ProductEvents.FindAll,
    'find-product-by-id': ProductEvents.FindById
  }

  return eventMap[event] || ProductEvents.Unknown
}
