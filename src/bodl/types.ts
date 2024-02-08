export interface BodlConsentPayload {
  advertising: boolean
  analytics: boolean
  functional: boolean
}

export interface BodlEvents {
  consent: {
    emitConsentLoadedEvent: (payload: BodlConsentPayload) => void
    emitConsentUpdatedEvent: (payload: BodlConsentPayload) => void
  }
}

export type WindowWithBodlEvents = Window &
  typeof globalThis & {
    bodlEvents?: BodlEvents
  }
