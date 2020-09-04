import {defaultStyles, defaultTitle} from '@/constants'


const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  headerTitle: defaultTitle,
  updated: new Date().toJSON()
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : defaultState
}