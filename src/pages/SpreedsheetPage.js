import { Page } from '@core/page/Page'
import { Spreedsheet } from '@/components/spreedsheet/Spreedsheet'
import { Header } from '@/components/header/Header'
import { Toolbar } from '@/components/toolbar/Toolbar'
import { Formula } from '@/components/formula/Formula'
import { Table } from '@/components/table/Table'
import { createStore } from '@core/store/createStore'
import { rootReducer } from '@/redux/rootReducer'
import { normalizeInitialState } from '@/redux/initialState'
import { StateProcessor } from '@core/page/StateProcessor'
import { LocalStorageClient } from '@/shared/LocalStorageClient'

export class SpreedsheetPage extends Page {
  constructor(param) {
    super(param)
    this.storeSub = null
    this.processor = new StateProcessor(new LocalStorageClient(this.params))
  }

  async getRoot() {
    const state = await this.processor.get()
    const store = createStore(rootReducer, normalizeInitialState(state))

    this.storeSub = store.subscribe(this.processor.listen)

    this.spreedsheet = new Spreedsheet({
      components: [Header, Toolbar, Formula, Table],
      store,
    })

    return this.spreedsheet.getRoot()
  }

  afterRender() {
    this.spreedsheet.init()
  }

  destroy() {
    this.spreedsheet.destroy()
    this.storeSub.unsubscribe()
  }
}
