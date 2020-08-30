export class DomElementNotFound extends Error {
  constructor(message) {
    super(message)
    this.name = 'DomElementNotFound'
  }
}

class Dom {
  /**
   * @param {string|EventTarget} selector
   */
  constructor(selector) {
    this._$el = typeof selector === 'string' ? document.querySelector(selector) : selector
  }


  html(html) {
    if (typeof html === 'string') {
      this._$el.innerHTML = html
      return this
    }
    return this._$el.outerHTML.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node._$el
    }
    this._$el.append(node)
    return this
  }

  on(eventType, callback) {
    this._$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this._$el.removeEventListener(eventType, callback)
  }

  closest(selector) {
    return $(this._$el.closest(selector))
  }

  getCords() {
    return this._$el.getBoundingClientRect()
  }

  get data() {
    return this._$el.dataset
  }

  /**
   * @param {string} selector
   * @return {NodeListOf<Element>}
   */
  find(selector) {
    return this._$el.querySelectorAll(selector)
  }

  /**
   * @param {string} selector
   * @return {Dom}
   */
  findOne(selector) {
    return $(this._$el.querySelector(selector))
  }

  addClass(className) {
    this._$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this._$el.classList.remove(className)
    return this
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => this._$el.style[key] = styles[key])
    return this
  }

  /**
   * @param {boolean} parse
   * @return {{col: number, row: number}|*}
   */
  getDataId(parse = false) {
    if (parse) {
      const parsed = this.getDataId().split(':')
      return {
        row: +parsed[0],
        col: +parsed[1]
      }
    }
    return this.data.id
  }

  /**
   * @param {boolean=} focusEnd
   * @return {Dom}
   */
  focus(focusEnd) {
    this._$el.focus()
    if (focusEnd) {
      const range = document.createRange()
      range.selectNodeContents(this._$el)
      range.collapse(false)
      const sel = window.getSelection()
      sel.removeAllRanges()
      sel.addRange(range)
    }
    return this
  }

  /**
   *
   * @param {string=} text
   */
  text(text) {
    if (typeof text === 'string') {
      this._$el.textContent = text
      return this
    }
    if (this._$el.tagName.toLowerCase() === 'input') {
      return this._$el.value.trim()
    }
    return this._$el.textContent.trim()
  }
}

/**
 *
 * @param {EventTarget} selector
 * @return {Dom}
 */
export function $(selector) {
  const domElement = new Dom(selector)
  if (!domElement._$el) {
    throw new DomElementNotFound(`Can't find element with selector "${selector}"`)
  }

  return domElement
}

$.create = (tagName, ...classes) => {
  const el = document.createElement(tagName)
  if (classes.length) {
    classes.forEach(classs => el.classList.add(classs))
  }
  return $(el)
}

/**
 * @param {string} selector
 * @return {NodeListOf<HTMLElementTagNameMap[*]>}
 */
$.find = (selector) => {
  return document.querySelectorAll(selector)
}

/**
 * @param {string} selector
 * @return {Dom}
 */
$.findOne = (selector) => {
  return $(document.querySelector(selector))
}