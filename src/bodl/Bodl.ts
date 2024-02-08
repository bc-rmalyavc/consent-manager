import { CategoryPreferences } from '../types'
import { BodlConsentPayload, BodlEvents, WindowWithBodlEvents } from './types'

class BODL {
  private readonly bodlEvents?: BodlEvents

  constructor() {
    const windowWithBodl = window as WindowWithBodlEvents
    this.bodlEvents = windowWithBodl.bodlEvents
  }

  public emitConsentLoadedEvent(preferences: CategoryPreferences | undefined) {
    if (this.bodlEvents) {
      this.bodlEvents.consent.emitConsentLoadedEvent(this.prepareBodlPayload(preferences))
    }
  }

  public emitConsentUpdatedEvent(preferences: CategoryPreferences | undefined) {
    if (this.bodlEvents) {
      this.bodlEvents.consent.emitConsentUpdatedEvent(this.prepareBodlPayload(preferences))
    }
  }

  private prepareBodlPayload(preferences: CategoryPreferences | undefined): BodlConsentPayload {
    const { advertising = false, functional = false, marketingAndAnalytics: analytics = false } =
      preferences || {}

    return {
      advertising: Boolean(advertising),
      functional: Boolean(functional),
      analytics: Boolean(analytics)
    }
  }
}

export const bodl = new BODL()
