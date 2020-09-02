import {DEFAULT_COL_WIDTH} from '@/components/table/template/template'


export default function getColWidth(state, index) {
  return (state[index] || DEFAULT_COL_WIDTH) + 'px'
}