import {getColWidth} from '@/components/table/template'
import {toInlineStyles} from '@core/utils'
import {defaultStyles} from '@/constants'


export default function createCell(row, {colState, dataState, stylesState}) {
  return function (letter, col) {
    const width = getColWidth(colState, col)
    const id = `${row}:${col}`
    const text = dataState[id] || ''
    const styles = toInlineStyles({...defaultStyles, ...stylesState[id]})
    return `
        <div class="spreedsheet__table__row__data-cell"
         contenteditable 
         data-col="${col}"
         data-row="${row}" 
         data-type="cell"
         data-id="${id}"
         data-letter="${letter}"
         data-value="${text}"
         style="${styles}; width:${width}"
         >${text}</div>
    `
  }
}