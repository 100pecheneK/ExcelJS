import {ExcelComponent} from '@core/ExcelComponent'
import {createHeader} from '@/components/header/template'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {debounce} from '@core/utils'


export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($wrapper, options) {
    super($wrapper, {
      name: 'Header',
      listeners: ['input'],
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
}