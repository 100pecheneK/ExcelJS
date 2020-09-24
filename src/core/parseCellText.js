import {$} from '@core/dom'


const ERROR_FORMULA_MESSAGE = '#Error#'

export function parseFormula($node) {
  const {value, currentCellData} = getValue($node)
  if (isFormula(value)) {
    try {
      checkValue(value, currentCellData)

      const operators = parseOperators(value)
      const operands = getOperandsOrThrowError(value)
      const formula = []
      operands.forEach(({letter, number}, i) => {
        let {text, $cell} = getCellValue({letter, number, currentCellData})
        if (text && isFormula(text)) {
          text = parseFormula($cell)
        }
        if (i !== 0) {
          formula.push(operators[i - 1])
        }
        if (text) {
          formula.push(text)
        }
      })
      return parseFormulaText(formula.join(''))
    } catch (e) {
      console.warn(`Bad formula in cell "${currentCellData.letter}:${currentCellData.number + 1}":`, e.message)
      return ERROR_FORMULA_MESSAGE
    }
  }
}

// utils
function checkValue(value, currentCellData) {
  if (value === '=') {
    throw new Error('No formula found')
  }
  if (value.slice(1) === currentCellData.pos) {
    throw new Error('Self reference')
  }
}

function getOperandsOrThrowError(value) {
  const operands = parseOperands(value)
  if (operands.length) {
    return operands.map(makeOperandObject)
  } else {
    throw new Error('Invalid formula')
  }
}


function parseFormulaText(value = '') {
  try {
    return eval(value)
  } catch (e) {
    throw new Error('Error execute')
  }
}

function isFormula(value) {
  return value.startsWith('=')
}

function parseOperands(value) {
  return value.match(/\w+/g)
}

function parseOperators(value) {
  return value.match(/[-+*\/]/g)
}

function getCellValue({letter, number, currentCellData}) {
  if (letter && currentCellData) {
    const $cellInFormula = $.findOne(`[data-letter="${letter}"][data-row="${number - 1}"]`)
    let users = JSON.parse($cellInFormula.attr('data-users'))
    if (users) {
      let user = users.some(user => !(user.l === letter && user.n === number))
      if (!user) {
        users.push({l: currentCellData.letter, n: currentCellData.number})
      }
    } else {
      users = [{l: currentCellData.letter, n: currentCellData.number}]
    }

    $cellInFormula.attr('data-users', JSON.stringify(users))

    return {text: $cellInFormula.text(), $cell: $cellInFormula}
  } else {
    return {text: number}
  }
}

function makeOperandObject(operand) {
  const letter = operand.match(/[a-zA-Z]+/)
  const number = operand.match(/\d+/)
  if (letter && !number) {
    throw new Error('Invalid formula: Bad cell reference')
  }
  return {
    letter: letter ? letter[0] : letter,
    number: number ? number[0] : number
  }
}

function getValue(val) {
  if (typeof val === 'string') {
    return {value: val}
  } else {

    // let v = val.text()
    // if (!isFormula(v)) {
    //   v = val.attr('data-value')
    // }
    let v = val.attr('data-value')
    const letter = val.attr('data-letter')
    const number = val.attr('data-row')
    return {
      value: v,
      currentCellData: {
        letter,
        number,
        pos: letter + number
      },
    }
  }
}
