import {createToolbar} from '@/components/toolbar/template'
import {$} from '@core/dom'
import {SpreedsheetStateComponent} from '@core/SpreedsheetStateComponent'
import {defaultStyles} from '@/constants'


export class Toolbar extends SpreedsheetStateComponent {
  static className = 'spreedsheet__toolbar'

  constructor($wrapper, options) {
    super($wrapper, {
      name: 'Toolbar',
      subscriptions: ['currentStyles'],
      listeners: ['click'],
      ...options
    })
  }

  prepare() {
    this.initState(defaultStyles)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  storeChanged({currentStyles}) {
    this.setState(currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.emit('TOOLBAR:APPLY_STYLE', value)
    }
  }
}