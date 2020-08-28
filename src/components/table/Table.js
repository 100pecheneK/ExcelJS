import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/template'
import {resizeHandler, shouldResize} from '@/components/table/resize'
import {TableSelection} from '@/components/table/TableSelection'
import {isCell, selectHandler} from '@/components/table/select'
import {hotKeysHandler} from '@/components/table/hotKeys'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($wrapper) {
    super($wrapper, {listeners: ['mousedown', 'keydown']})
  }

  toHTML() {
    return createTable(100)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $firstCell = this.$wrapper.findOne('[data-id="0:0"]')
    this.selection.select($firstCell)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event, this.$wrapper)
    } else if (isCell(event)) {
      selectHandler(event, this.$wrapper, this.selection)
    }
  }

  onKeydown(event) {
    hotKeysHandler(event, this.$wrapper, this.selection)
  }
}
