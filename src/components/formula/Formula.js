import {SpreedsheetComponent} from '@core/SpreedsheetComponent'
import {$} from '@core/dom'


export class Formula extends SpreedsheetComponent {
  static className = 'spreedsheet__formula'

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
        <div class="spreedsheet__formula__info">fx</div>
        <div id="formula" class="spreedsheet__formula__input" contenteditable spellcheck="false"></div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$wrapper.findOne('#formula')
    this.on('TABLE:SELECT', $cell => {
      this.$formula.text($cell.data.value)
    })
    this.on('TABLE:FORMULA_START', () => {
      this.$formula.focus(true)
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