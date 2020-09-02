import {getRowHeight} from '@/components/table/template'


export default function createRow(content, index = '', state = {}) {
  const numberContent = index && `
    ${index}
    <div class="excel__table__row-number--resize" data-resize="row"></div>
  `
  const height = getRowHeight(state, index)
  return `
    <div class="excel__table__row" ${index && 'data-type="resizable"'} 
         data-row="${index}"
         style="height: ${height}"
         >
        <div class="excel__table__row-number">${numberContent}</div>
        <div class="excel__table__row__data">${content}</div>
    </div>
  `
}