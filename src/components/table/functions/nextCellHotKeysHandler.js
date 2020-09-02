export {
  nextCellHotKeysHandler,
  isNotExtraKeys
}

/**
 * Обработка горячих клавиш
 * @param {KeyboardEvent} event
 * @param {Dom} $wrapper
 * @param {TableSelection} selection
 */
function nextCellHotKeysHandler(event, $wrapper, selection) {
  event.preventDefault()
  const key = event.key
  const currentCellId = selection.current.getDataId(true)
  const $nextCell = $wrapper.findOne(nextCellSelector(key, currentCellId))
  selection.select($nextCell)
}

/**
 *
 * @param {KeyboardEvent} event
 */
function isNotExtraKeys({
                          shiftKey,
                          altKey,
                          ctrlKey,
                          metaKey
                        }) {
  return !(shiftKey || altKey || ctrlKey || metaKey)
}

/**
 *
 * @param {string} key
 * @param {{col: number, row: number}} currentCellId
 */
function nextCellSelector(key, {row, col}) {
  const MIN_ROW = 0
  const MIN_COL = 0
  switch (key) {
    case 'Enter':
    case 'ArrowDown':
      row++
      break
    case 'Tab':
    case 'ArrowRight':
      col++
      break
    case 'ArrowLeft':
      if (col > MIN_COL) {
        col--
      }
      break
    case 'ArrowUp':
      if (row > MIN_ROW) {
        row--
      }
      break
  }

  return `[data-id="${row}:${col}"]`
}