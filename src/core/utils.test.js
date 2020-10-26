import {
  camelToDashCase,
  capitalize,
  debounce,
  getCountOfDecimalPlaces,
  getIndentName,
  getRange,
  isEqual,
  preventDefault,
  storage,
  toInlineStyles,
  withFadeIn,
} from '@core/utils'

describe('capitalize:', () => {
  test('Should return string', () => {
    const capitalized = capitalize(1)
    expect(typeof capitalized).toBe('string')
  })
  test('Should return capitalized first letter in word', () => {
    const capitalized = capitalize('hello')
    expect(capitalized[0]).toBe('H')
  })
})

describe('getIndentName:', () => {
  test('Should return n-th string from the sequence', () => {
    expect(getIndentName(0)).toBe('A')
    expect(getIndentName(22)).toBe('W')
    expect(getIndentName(100)).toBe('CW')
  })
})

describe('getRange:', () => {
  test('Should return array', () => {
    const isArray = Array.isArray(getRange(1, 10))
    expect(isArray).toBeTruthy()
  })
  test('Should return array with positive numbers', () => {
    const arr = getRange(1, 10)
    expect(arr).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
  test('Should return array with numbers between two given', () => {
    const arr = getRange(1, 10)
    expect(arr).toStrictEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
  })
})

describe('storage:', () => {
  let key = 'key'
  beforeEach(() => {
    localStorage.clear()
  })
  test('Should place data in localstorage with given key', () => {
    storage(key, 'hello')
    const data = JSON.parse(localStorage.getItem(key))
    expect(data).toBe('hello')
  })
  test('Should get data from localstorage with given key', () => {
    const data = { hello: 'hello' }
    localStorage.setItem(key, JSON.stringify(data))
    const st = storage(key)
    expect(st).toEqual(data)
  })
  test('Should get parsed data', () => {
    const data = { hello: 'hello' }
    localStorage.setItem(key, JSON.stringify(data))
    const st = storage(key)
    expect(st.hello).toBeDefined()
  })
})

describe('isEqual:', () => {
  test('Should return true if two numbers is equals and false if not', () => {
    expect(isEqual(1, 1)).toBeTruthy()
  })
  test('Should return true if two strings is equals and false if not', () => {
    expect(isEqual('ME', 'ME')).toBeTruthy()
  })
  test('Should return true if two objects is equals and false if not', () => {
    const obj_1 = {
      a: 1,
      b: {
        c: 2,
      },
      j: [
        { f: 1, g: 2 },
        { s: 4, g: 4 },
      ],
      s: 'd',
    }
    const obj_2 = {
      a: 1,
      b: {
        c: 2,
      },
      j: [
        { f: 1, g: 2 },
        { s: 4, g: 4 },
      ],
      s: 'd',
    }
    expect(isEqual(obj_1, obj_2)).toBeTruthy()
  })
})
describe('camelToDashCase:', () => {
  test('Should convert Camel Case to Dash Case', () => {
    const dashCase = camelToDashCase('DashCase')
    const dashCase2 = camelToDashCase('dashCase')
    expect(dashCase).toBe('dash-case')
    expect(dashCase2).toBe('dash-case')
  })
})
describe('toInlineStyles:', () => {})
describe('debounce:', () => {})
describe('withFadeIn:', () => {})
describe('preventDefault:', () => {})
describe('getCountOfDecimalPlaces:', () => {})
