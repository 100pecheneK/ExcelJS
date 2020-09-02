import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'
import {TABLE_CHANGE_TEXT} from '@/redux/types'
import * as actions from '@/redux/actions'


export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($wrapper, options) {
    super($wrapper, {
      name: 'Formula',
      subscriptions: ['currentText'],
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
        <div class="excel__formula__info">fx</div>
        <div id="formula" class="excel__formula__input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$wrapper.findOne('#formula')
    this.on('TABLE:SELECT', $cell => {
      this.$formula.text($cell.data.value)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.emit('FORMULA:INPUT', $(event.target).text())
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab'
    ]
    if (keys.includes(event.key)) {
      event.preventDefault()
      this.emit('FORMULA:DONE')
    }
  }
}