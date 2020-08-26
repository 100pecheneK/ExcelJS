import {getIndentName} from '@core/utils'


function createEmptyCell() {
  return `
    <div class="excel__table__row__data-cell" contenteditable></div>
  `
}

function createColumn(content) {
  return `
    <div class="excel__table__row__data-column">${content}</div>
  `
}

function createRow(content, index = '') {
  return `
    <div class="excel__table__row">
        <div class="excel__table__row-number">${index}</div>
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