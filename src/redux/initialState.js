import {storage} from '@core/utils'
import {defaultStyles, defaultTitle} from '@/constants'


const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
  headerTitle: defaultTitle,
}

const normalize = state => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: ''
})

const storageData = storage('excel')
export const initialState = storageData ? normalize(storageData) : defaultState
