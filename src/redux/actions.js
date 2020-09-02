import {
  TABLE_CHANGE_TEXT,
  TABLE_CHANGE_STYLES,
  TABLE_RESIZE,
  TABLE_APPLY_STYLE, HEADER_CHANGE_TITLE
} from '@/redux/types'


export function tableResize({id, value, type}) {
  return {type: TABLE_RESIZE, payload: {id, value, type}}
}

export function tableChangeText({id, value}) {
  return {
    type: TABLE_CHANGE_TEXT,
    payload: {id, value}
  }
}

export function changeStyles(data) {
  return {
    type: TABLE_CHANGE_STYLES,
    payload: data
  }
}

export function applyStyle(data) {
  return {
    type: TABLE_APPLY_STYLE,
    payload: data
  }
}

export function changeHeaderTitle(title) {
  return {
    type: HEADER_CHANGE_TITLE,
    payload: title
  }
}