import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routes/ActiveRoute'

export class Router {
  /**
   *
   * @param selector
   * @param {{Dashboard, Excel}} routes
   */
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }
    this.$placeholder = $(selector)

    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear()
    const Page = this.getPage()
    this.page = new Page(ActiveRoute.param)
    this.$placeholder.append(this.page.getRoot())

    this.page.afterRender()
  }

  getPage() {
    if (ActiveRoute.path.includes('excel')) {
      return this.routes.Excel
    }
    return this.routes.Dashboard
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}