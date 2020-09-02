import {DEFAULT_ROW_HEIGHT} from '@/components/table/template/template'


export default function getRowHeight(state, index) {
  return (state[index] || DEFAULT_ROW_HEIGHT) + 'px'
}