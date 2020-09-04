import { Page } from '@core/Page'
import { $ } from '@core/dom'
import {createRecordsTable, getAllRecords} from '@/pages/dashboard.functions'

export class DashboardPage extends Page {
  getRoot() {
    const now = Date.now().toString()
    return $.create('div', 'dashboard').html(
      `
        <div class="dashboard__header">
            <h1>Dashboard</h1>
        </div>
        <div class="dashboard__new">
            <div class="dashboard__new dashboard__view">
                    <a href="#excel/${now}" class="dashboard__new-create">
                    Новая<br>таблица
                </a>
            </div>
        </div>
        <div class="dashboard__table dashboard__view">
            ${createRecordsTable()}
        </div>
      `
    )
  }
}
