import {DomListener} from '@core/DomListener'


export class ExcelComponent extends DomListener {

  constructor($wrapper, options = {}) {
    super($wrapper, options.listeners)
    this.name = options.name || ''
    this.emitter = options.emitter
    this.emitterUnsubs = []
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

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
    this.emitterUnsubs.forEach(unsub => unsub())
  }
}