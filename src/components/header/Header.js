import {SpreedsheetComponent} from '@core/SpreedsheetComponent'
import {createHeader} from '@/components/header/template'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils'
import {ActiveRoute} from '@core/routes/ActiveRoute'


export class Header extends SpreedsheetComponent {
  static className = 'spreedsheet__header'

  constructor($wrapper, options) {
    super($wrapper, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  toHTML() {
    const title = this.store.getState().headerTitle
    return createHeader({title})
  }

  onInput(event) {
    const $target = $(event.target)
    this.dispatch(actions.changeHeaderTitle($target.text()))
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'remove') {
      const remove = confirm('Уверены?')
      if (remove) {
        localStorage.removeItem('spreedsheet:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    } else if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    }
  }
}