import {getIndentName} from '@core/utils'


function createCell(row) {
  return function (_, col) {
    return `
        <div class="excel__table__row__data-cell"
         contenteditable 
         data-col="${col}"
         data-row="${row}" 
         data-type="cell"
         data-id="${row}:${col}"
         ></div>
    `
  }
}

function createColumn(content, index) {
  return `
    <div class="excel__table__row__data-column"
     data-type="resizable"
      data-col="${index}"
      >
        ${content}
        <div class="excel__table__row__data-column--resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, index = '') {
  const numberContent = index && `
    ${index}
    <div class="excel__table__row-number--resize" data-resize="row"></div>
  `
  return `
    <div class="excel__table__row" ${index && 'data-type="resizable"'}>
        <div class="excel__table__row-number">${numberContent}</div>
        <div class="excel__table__row__data">${content}</div>
    </div>
  `
}

function getLetter(_, i) {
  return getIndentName(i)
}

function generateFirstRow(rowsCount) {
  return new Array(rowsCount)
    .fill('')
    .map(getLetter)
    .map(createColumn)
    .join('')
}

function generateSecondRow(rowsCount, row) {
  return new Array(rowsCount)
    .fill('')
    .map(createCell(row))
    .join('')
}

export function createTable(rowsCount = 26) {
  const rows = []

  // Generate first row with length = rowsCount
  const firstRow = generateFirstRow(rowsCount)
  // Create columns with _ A B C ... Z ...
  rows.push(createRow(firstRow))

  // Generate seconds row with length = rowsCount
  for (let row = 0; row < rowsCount; row++) {
    const emptyCells = generateSecondRow(rowsCount, row)
    // Create row includes cell with row number and empty cells
    rows.push(createRow(emptyCells, row + 1))
  }

  // Generate final table
  return rows.join('')
}