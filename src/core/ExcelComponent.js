import {DomListener} from '@core/DomListener'


export class ExcelComponent extends DomListener {

  constructor($wrapper, options = {}) {
    super($wrapper, options.listeners)
    this.name = options.name || ''
  }

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}