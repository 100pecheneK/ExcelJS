export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * Return n-th string from the sequence
 * a, b, c, ... , z, aa, ab, ... , az, ba, ... , zz, aaa, ...
 * @param indentNumber - string number in sequence
 * @param firstCharCode
 * @return {string}
 */
export function getIndentName(indentNumber, firstCharCode = 65) {
  let b = [indentNumber],
    sp,
    out,
    i,
    div

  sp = 0
  while (sp < b.length) {
    if (b[sp] > 25) {
      div = Math.floor(b[sp] / 26)
      b[sp + 1] = div - 1
      b[sp] %= 26
    }
    sp += 1
  }

  out = ''
  for (i = 0; i < b.length; i += 1) {
    out = String.fromCharCode(firstCharCode + b[i]) + out
  }

  return out
}

/**
 * Возвращает массив положительных чисел в массиве,
 * равных разнице между start и end по модулю
 * @param start - string number in sequence
 * @param end
 * @return {number[]}
 */
export function getRange(start, end) {
  if (start > end) {
    ;[end, start] = [start, end]
  }
  return new Array(end - start + 1).fill('').map((_, i) => start + i)
}

/**
 *
 * @param {string} key
 * @param data
 * @return {any}
 */
export function storage(key, data = null) {
  if (!data) {
    const parsedData = JSON.parse(localStorage.getItem(key))
    return parsedData
  }
  localStorage.setItem(key, JSON.stringify(data))
}

/**
 * if a === b return true else false
 * this is not deep equal for object!!
 * @param a
 * @param b
 * @return {boolean}
 */
export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b)
  }
  return a === b
}

export function camelToDashCase(str) {
  str = str[0].toLowerCase() + str.slice(1)
  return str.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
}

export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map(key => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';')
}

/**
 * @param {function} fn
 * @param {number} ms
 * @return {function(...[*]=)}
 */
export function debounce(fn, ms) {
  let timeout
  return function (...args) {
    const later = () => {
      clearTimeout(timeout)
      fn.apply(this, args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, ms)
  }
}

export function withFadeIn($el) {
  if ($el.addClasses) {
    return $el.addClasses('animate__animated animate__fadeIn')
  } else {
    throw new Error('$el must have method "addClasses"')
  }
}

export function preventDefault(e) {
  e.preventDefault()
}

export function getCountOfDecimalPlaces(x) {
  return ~(x + '').indexOf('.') ? (x + '').split('.')[1].length : 0
}

export function factorial(n) {
  n = +n
  return n != 1 ? n * factorial(n - 1) : 1
}
