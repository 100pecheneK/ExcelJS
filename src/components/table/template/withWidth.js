import {getColWidth} from '@/components/table/template'


export default function withWidth(state) {
  return function (content, index) {
    return {
      content, index, width: getColWidth(state, index)
    }
  }
}