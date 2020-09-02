export function parseCellText(value = '') {
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1))
    } catch (e) {
      console.warn('Bad formula', e.message)
      return value
    }
  }
  return value
}