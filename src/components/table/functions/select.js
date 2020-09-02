import {$} from '@core/dom'
import {getRange} from '@core/utils'


export {
  selectHandler,
  isCell
}

/**
 * Выделяет ячейку или группы ячеек
 * @param {MouseEvent} event
 * @param {Dom} $wrapper
 * @param {TableSelection} selection
 */
function selectHandler(event, $wrapper, selection) {
  const $target = $(event.target)
  if (event.shiftKey) {
    const $cells = getSelectedCells($target, selection.current, $wrapper)
    selection.selectGroup($cells)
  } else {
    selection.select($target)
  }
  return $target
}

/**
 * Возвращает True если data-type === 'cell' у элемента в event.target
 * @param {MouseEvent} event
 * @return {boolean}
 */
function isCell(event) {
  return event.target.dataset.type === 'cell'
}

/**
 *
 * @param {Dom} $target
 * @param {Dom} $current
 * @param {Dom} $wrapper
 * @return {(jQuery|HTMLElement|Dom)[]}
 */
function getSelectedCells($target, $current, $wrapper) {
  return getCellsIdsBetween($target, $current)
    .map(id => $wrapper.findOne(`[data-id="${id}"]`))
}

/**
 * Возвращает id колонок между двумя выбранными
 * @param {Dom} $cell_1
 * @param {Dom} $cell_2
 * @return {*[]}
 */
function getCellsIdsBetween($cell_1, $cell_2) {
  const cell_1 = $cell_1.getDataId(true)
  const cell_2 = $cell_2.getDataId(true)
  const cols = getRange(cell_1.col, cell_2.col)
  const rows = getRange(cell_1.row, cell_2.row)

  return cols.reduce((acc, col) => {
    rows.forEach(row => acc.push(`${row}:${col}`))
    return acc
  }, [])
}