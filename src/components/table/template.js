import {getIndentName} from '@core/utils'


function createEmptyCell(_, index) {
  return `
    <div class="excel__table__row__data-cell" contenteditable data-col="${index}"></div>
  `
}

function createColumn(content, index) {
  return `
    <div class="excel__table__row__data-column" data-type="resizable" data-col="${index}"">
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

function generateSecondRow(rowsCount) {
  return new Array(rowsCount)
    .fill('')
    .map(createEmptyCell)
    .join('')
}

export function createTable(rowsCount = 26) {
  const rows = []

  // Generate first row with length = rowsCount
  const firstRow = generateFirstRow(rowsCount)
  // Create columns with _ A B C ... Z ...
  rows.push(createRow(firstRow))

  // Generate seconds row with length = rowsCount
  for (let i = 0; i < rowsCount; i++) {
    const emptyCells = generateSecondRow(rowsCount)
    // Create row includes cell with row number and empty cells
    rows.push(createRow(emptyCells, i + 1))
  }

  // Generate final table
  return rows.join('')
}