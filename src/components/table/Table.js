import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/template'
import {$} from '@core/dom'


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
    const resizeTarget = event.target.dataset.resize
    if (resizeTarget) {
      const $resizer = $(event.target)
      const $parent = $resizer.closest(['[data-type="resizable"]'])
      const cords = $parent.getCords()
      if (resizeTarget === 'col') {
        const cols = this.$wrapper.find(`[data-col="${$parent.data.col}"]`)
        document.onmousemove = e => {
          const delta = e.clientX - cords.right
          const width = cords.width + delta + 'px'
          cols.forEach(cell => cell.style.width = width)
        }
        document.onmouseup = () => {
          document.onmousemove = null
        }
      } else if (resizeTarget === 'row') {
        document.onmousemove = e => {
          const delta = e.clientY - cords.bottom
          $parent.css({height: cords.height + delta + 'px'})
        }
        document.onmouseup = () => {
          document.onmousemove = null
        }
      }
    }
  }


}