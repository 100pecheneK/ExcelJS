import {capitalize} from '@core/utils'


export class DomListener {
  constructor($wrapper, listeners = []) {
    if (!$wrapper) {
      throw new Error('No $wrapper provided for DomListener')
    }
    this.$wrapper = $wrapper
    this.listeners = listeners
  }

  initDOMListeners() {
    this.listeners.forEach(listener => {
      const callbackName = getCallbackName(listener)
      if (!this[callbackName]) {
        throw new Error(`Method ${callbackName} is not implemented in ${this.name} Component`)
      }
      this[callbackName] = this[callbackName].bind(this)
      this.$wrapper.on(listener, this[callbackName])
    })
  }

  removeDOMListeners() {
    this.listeners.forEach(listener => {
      const callbackName = getCallbackName(listener)
      this.$wrapper.off(listener, this[callbackName])
    })
  }
}

function getCallbackName(eventName) {
  return 'on' + capitalize(eventName)
}