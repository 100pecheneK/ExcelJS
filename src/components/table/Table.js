import {ExcelComponent} from '@core/ExcelComponent'
import createTable from '@/components/table/template'
import {resizeHandler, shouldResize} from '@/components/table/functions/resize'
import {TableSelection} from '@/components/table/TableSelection'
import {isCell, selectHandler} from '@/components/table/functions/select'
import {
  isNotExtraKeys,
  nextCellHotKeysHandler
} from '@/components/table/functions/nextCellHotKeysHandler'
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {defaultStyles} from '@/constants'
import {parseCellText} from '@core/parseCellText'


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
    return createTable(100, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    // Select first cell
    this.selection.select(this.$wrapper.findOne('[data-id="0:0"]'))

    // Dispatch and emit select events
    this.onSelectCell()

    this.on('FORMULA:INPUT', text => {
      console.log(text)
      this.onChangeCellTextValue(text)
    })
    this.on('FORMULA:DONE', () => {
      this.selection.current.focus(true)
    })
    this.on('TOOLBAR:APPLY_STYLE', value => {
      this.selection.applyStyle(value)
      this.dispatch(actions.applyStyle({
        value,
        ids: this.selection.selectedIds
      }))
    })
  }

  onSelectCell() {
    this.emit('TABLE:SELECT', this.selection.current)
    const styles = this.selection.current.getStyles(Object.keys(defaultStyles))
    this.dispatch(actions.changeStyles(styles))
  }

  onResizeTable(event) {
    try {
      resizeHandler(event, this.$wrapper).then((data) => {
        this.dispatch(actions.tableResize(data))
      })
    } catch (e) {
      console.warn('Resize error:', e.message)
    }
  }

  onChangeCellTextValue(value) {
    this.selection.current
      .attr('data-value', value)
      .text(parseCellText(value))

    this.dispatch(actions.tableChangeText({
      id: this.selection.current.getDataId(),
      value
    }))
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      // Resize
      this.onResizeTable(event)
    } else if (isCell(event)) {
      // Select
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
    if (keys.includes(event.key) && isNotExtraKeys(event)) {
      nextCellHotKeysHandler(event, this.$wrapper, this.selection)
      this.onSelectCell()
    }
  }

  onInput(event) {
    this.onChangeCellTextValue($(event.target).text())
  }
}
