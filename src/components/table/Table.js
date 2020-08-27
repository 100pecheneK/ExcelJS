import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/template'
import {
  resizeHandler,
  shouldResize
} from '@/components/table/resize'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($wrapper) {
    super($wrapper,
      {
        listeners: ['mousedown']
      })
  }

  toHTML() {
    return createTable(100)
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$wrapper, event)
    }
  }
}