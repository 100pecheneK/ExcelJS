import 'animate.css/animate.min.css'
import './scss/index.scss'
import {Router} from '@core/routes/Router'
import {DashboardPage} from '@/pages/DashboardPage'
import {SpreedsheetPage} from '@/pages/SpreedsheetPage'


new Router('#app', {
  Dashboard: DashboardPage,
  Spreedsheet: SpreedsheetPage
})
