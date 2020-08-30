import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/template'
import {resizeHandler, shouldResize} from '@/components/table/resize'
import {TableSelection} from '@/components/table/TableSelection'
import {isCell, selectHandler} from '@/components/table/select'
import {nextCellHotKeysHandler} from '@/components/table/nextCellHotKeysHandler'
import {$} from '@core/dom'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($wrapper, options) {
    super($wrapper, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(100)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    this.selection.select(this.$wrapper.findOne('[data-id="0:0"]'))

    this.onSelectCell()

    this.on('FORMULA:INPUT', text => {
      this.selection.current.text(text)
    })
    this.on('FORMULA:DONE', () => {
      this.selection.current.focus(true)
    })
  }

  onSelectCell() {
    this.emit('TABLE:SELECT', this.selection.current)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$wrapper)
    } else if (isCell(event)) {
      selectHandler(event, this.$wrapper, this.selection)
      this.onSelectCell()
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowDown',
      'ArrowUp'
    ]
    if (keys.includes(event.key) && !event.shiftKey) {
      nextCellHotKeysHandler(event, this.$wrapper, this.selection)
      this.onSelectCell()
    }
  }

  onInput(event) {
    this.emit('TABLE:INPUT', $(event.target))
  }
}
