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
  const {resizeTargetType, ...resizeAttributes} = getResizeAttributes(event)
  if (resizeTargetType === 'col') {
    resizeCol({resizeAttributes, $wrapper})
  } else if (resizeTargetType === 'row') {
    resizeRow({resizeAttributes})
  }
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
  let width
  $resizer.css({height: '100vh', opacity: 1})

  document.onmousemove = e => {
    const delta = e.clientX - cords.right
    width = cords.width + delta + 'px'
    const right = -delta + 'px'
    $resizer.css({right})
  }

  document.onmouseup = () => {
    $wrapper.find(`[data-col="${$parent.data.col}"]`).forEach(cell => cell.style.width = width)
    $resizer.css({height: 'auto', opacity: '0', right: 0})
    document.onmousemove = null
    document.onmouseup = null
  }
}

function resizeRow({resizeAttributes: {$resizer, $parent, cords}}) {
  let height
  $resizer.css({width: '100vw', opacity: 1})

  document.onmousemove = e => {
    const delta = e.clientY - cords.bottom
    height = cords.height + delta + 'px'
    const bottom = -delta + 'px'
    $resizer.css({bottom})
  }

  document.onmouseup = () => {
    $parent.css({height})
    $resizer.css({width: 'auto', opacity: '0', bottom: 0})
    document.onmousemove = null
    document.onmouseup = null
  }
}