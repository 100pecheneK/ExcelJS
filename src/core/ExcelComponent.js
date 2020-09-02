import {DomListener} from '@core/DomListener'


export class ExcelComponent extends DomListener {

  constructor(
    $wrapper,
    {
      listeners,
      emitter,
      store,
      name = '',
      subscriptions = []
    }
  ) {
    super($wrapper, listeners)
    this.name = name
    this.emitter = emitter
    this.emitterUnsubs = []
    this.store = store
    this.subscriptions = subscriptions
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  on(event, cb) {
    const unsub = this.emitter.on(event, cb)
    this.emitterUnsubs.push(unsub)
  }

  dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isSubscriber(key) {
    return this.subscriptions.includes(key)
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.emitterUnsubs.forEach(unsub => unsub())
  }
}