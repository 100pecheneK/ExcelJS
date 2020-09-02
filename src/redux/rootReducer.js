import {
  TABLE_CHANGE_TEXT,
  TABLE_RESIZE,
  TABLE_CHANGE_STYLES,
  TABLE_APPLY_STYLE, HEADER_CHANGE_TITLE
} from '@/redux/types'


export function rootReducer(state, {type, payload}) {
  let field
  let val
  switch (type) {
    case TABLE_RESIZE:
      field = payload.type === 'col' ? 'colState' : 'rowState'
      return {
        ...state,
        [field]: value(state, field, payload)
      }
    case TABLE_CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: payload.value,
        [field]: value(state, field, payload)
      }
    case TABLE_CHANGE_STYLES:
      return {
        ...state,
        currentStyles: payload
      }
    case TABLE_APPLY_STYLE:
      field = 'stylesState'
      val = {...state[field]} || {}
      payload.ids.forEach(id => {
        val[id] = {...val[id], ...payload.value}
      })

      return {
        ...state,
        [field]: val,
        currentStyles: {...state.currentStyles, ...payload.value}
      }
    case HEADER_CHANGE_TITLE:
      return {
        ...state,
        headerTitle: payload
      }
    default:
      return state
  }
}

function value(state, field, payload) {
  const val = {...state[field]} || {}
  val[payload.id] = payload.value
  return val
}