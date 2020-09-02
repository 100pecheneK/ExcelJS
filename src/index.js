import {Excel} from '@/components/excel/Excel'
import './scss/index.scss'
import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from '@core/createStore'
import {rootReducer} from '@/redux/rootReducer'
import {debounce, storage} from '@core/utils'
import {initialState} from '@/redux/initialState'


const store = createStore(rootReducer, initialState)
const stateListener = state => {
  // console.log(state)
  storage('excel', state)
}
store.subscribe(debounce(stateListener, 300))

const excel = new Excel(
  '#app',
  {
    components: [
      Header, Toolbar, Formula, Table
    ],
    store
  }
)

excel.render()