import inEU from '@segment/in-eu'
import React from 'react'
import ReactDOM from 'react-dom'

import * as preferences from './consent-manager-builder/preferences'
import { CloseBehavior } from './consent-manager/container'
import { ConsentManagerProps, WindowWithConsentManagerConfig, ConsentManagerInput } from './types'

import { ConsentManager, openConsentManager, doNotTrack } from '.'

export const version = process.env.VERSION
export { openConsentManager, doNotTrack, inEU, preferences }

let props: Partial<ConsentManagerInput> = {}
let containerRef: string | undefined

const localWindow = window as WindowWithConsentManagerConfig

if (localWindow.consentManagerConfig && typeof localWindow.consentManagerConfig === 'function') {
  props = localWindow.consentManagerConfig({
    React,
    version,
    openConsentManager,
    doNotTrack,
    inEU,
    preferences
  })
  containerRef = props.container
} else {
  throw new Error('window.consentManagerConfig should be a function')
}

if (!containerRef) {
  throw new Error('ConsentManager: container is required')
}

if (!props.bannerContent) {
  throw new Error('ConsentManager: bannerContent is required')
}

if (!props.cancelDialogContent) {
  throw new Error('ConsentManager: cancelDialogContent is required')
}

if (typeof props.implyConsentOnInteraction === 'string') {
  props.implyConsentOnInteraction = props.implyConsentOnInteraction === 'true'
}

if (props.closeBehavior !== undefined && typeof props.closeBehavior === 'string') {
  const options = [
    CloseBehavior.ACCEPT.toString(),
    CloseBehavior.DENY.toString(),
    CloseBehavior.DISMISS.toString()
  ]

  if (options.indexOf(props.closeBehavior) < 0) {
    throw new Error(`ConsentManager: closeBehavior should be one of ${options}`)
  }
}

const container = document.querySelector(containerRef)

if (!container) {
  throw new Error('ConsentManager: container not found')
}

ReactDOM.render(<ConsentManager {...(props as ConsentManagerProps)} />, container)
