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
  let b = [indentNumber], sp, out, i, div

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
 * Возвращает количество положительных чисел в массиве,
 * равных разнице между start и end по модулю
 * @param start - string number in sequence
 * @param end
 * @return {number[]}
 */
export function getRange(start, end) {
  if (start > end) {
    [end, start] = [start, end]
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, i) => start + i)
}