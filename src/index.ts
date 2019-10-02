import { EventContext } from 'firebase-functions'
import { collection, ref, transaction } from 'typesaurus'

export interface EventClaim {
  eventType: string
  eventId: string
  time: Date
}

export const eventClaims = collection<EventClaim>('eventClaims')

export default function once<EventData>(
  fn: (data: EventData, context: EventContext) => Promise<any>
) {
  return async (data: EventData, context: EventContext) => {
    const { eventId, eventType } = context
    const claimRef = ref(eventClaims, eventId)

    await transaction(async ({ get, set }) => {
      const claimDoc = await get(claimRef)

      if (claimDoc) throw new Error('The claim is already exist')

      await set(claimRef, {
        eventType,
        eventId,
        time: new Date()
      })
    })

    return fn(data, context)
  }
}
