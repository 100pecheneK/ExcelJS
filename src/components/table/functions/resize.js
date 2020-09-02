import {$, DomElementNotFound} from '@core/dom'


export {
  resizeHandler,
  shouldResize
}

/**
 * Изменяет размер колонки или строчки в зависимости от позиции курсора пользователя
 * @param {MouseEvent} event
 * @param {Dom} $wrapper
 */
function resizeHandler(event, $wrapper) {
  return new Promise(resolve => {
    const {resizeTargetType, ...resizeAttributes} = getResizeAttributes(event)
    if (resizeTargetType === 'col') {
      resizeCol({resizeAttributes, $wrapper}).then(resolve)
    } else if (resizeTargetType === 'row') {
      resizeRow({resizeAttributes}).then(resolve)
    }
  })
}

/**
 * Возвращает True если присутствует data-resize у элемента в event.target
 * @param {MouseEvent} event
 * @return {boolean}
 */
function shouldResize(event) {
  return !!event.target.dataset.resize
}

function getResizeAttributes(event) {
  try {
    const $resizer = $(event.target)
    const $parent = $resizer.closest(['[data-type="resizable"]'])
    const cords = $parent.getCords()
    const resizeTargetType = event.target.dataset.resize
    return {
      $resizer, $parent, cords, resizeTargetType
    }
  } catch (e) {
    if (e instanceof DomElementNotFound) {
      throw new Error('Resizer must have a parent with [data-type="resizable"]')
    }
  }
}

function resizeCol({resizeAttributes: {$resizer, $parent, cords}, $wrapper}) {
  return new Promise(resolve => {
    let width
    let value
    $resizer.css({height: '100vh', opacity: 1})

    document.onmousemove = e => {
      const delta = e.clientX - cords.right
      value = cords.width + delta
      width = value + 'px'
      const right = -delta + 'px'
      $resizer.css({right})
    }

    document.onmouseup = () => {
      $wrapper.find(`[data-col="${$parent.data.col}"]`).forEach(cell => cell.style.width = width)
      $resizer.css({height: 'auto', opacity: '0', right: 0})
      document.onmousemove = null
      document.onmouseup = null
      if (value) {
        resolve({
          value,
          type: 'col',
          id: $parent.data.col
        })
      }
    }
  })
}

function resizeRow({resizeAttributes: {$resizer, $parent, cords}}) {
  return new Promise(resolve => {
    let value
    let height
    $resizer.css({width: '100vw', opacity: 1})

    document.onmousemove = e => {
      const delta = e.clientY - cords.bottom
      value = cords.height + delta
      height = value + 'px'
      const bottom = -delta + 'px'
      $resizer.css({bottom})
    }

    document.onmouseup = () => {
      $parent.css({height})
      $resizer.css({width: 'auto', opacity: '0', bottom: 0})
      document.onmousemove = null
      document.onmouseup = null
      if (value) {
        resolve({
          value,
          type: 'row',
          id: $parent.data.row
        })
      }
    }
  })
}