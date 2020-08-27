class Dom {
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

  find(selector) {
    return this._$el.querySelectorAll(selector)
  }

  css(styles = {}) {
    Object.keys(styles).forEach(key => this._$el.style[key] = styles[key])
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, ...classes) => {
  const el = document.createElement(tagName)
  if (classes.length) {
    classes.forEach(classs => el.classList.add(classs))
  }
  return $(el)
}

$.find = (selector) => {
  return document.querySelectorAll(selector)
}