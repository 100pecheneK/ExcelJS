import {
  createColumn,
  getLetter,
  withWidth,
  createCell,
  createRow
} from '@/components/table/template'


export const DEFAULT_COL_WIDTH = 120
export const DEFAULT_ROW_HEIGHT = 24


function generateFirstRow(rowsCount, state) {
  return new Array(rowsCount)
    .fill('')
    .map(getLetter)
    .map(withWidth(state))
    .map(createColumn)
    .join('')
}

function generateSecondRow(rowsCount, row, state) {
  return new Array(rowsCount)
    .fill('')
    .map(createCell(row, state))
    .join('')
}

export default function createTable(
  rowsCount = 26,
  {colState, rowState, dataState, stylesState}) {

  const rows = []

  const firstRow = generateFirstRow(rowsCount, colState)
  rows.push(createRow(firstRow))

  for (let row = 0; row < rowsCount; row++) {
    const emptyCells = generateSecondRow(rowsCount, row, {colState, dataState, stylesState})
    rows.push(createRow(emptyCells, row + 1, rowState))
  }

  return rows.join('')
}