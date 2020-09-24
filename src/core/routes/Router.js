import { $ } from '@core/dom'
import { ActiveRoute } from '@core/routes/ActiveRoute'
import { Loader } from '@/components/Loader'
import { withFadeIn } from '@core/utils'

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
    this.loader = new Loader()
    this.routes = routes
    this.page = null
    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  async changePageHandler() {
    if (this.page) {
      this.page.destroy()
    }
    this.$placeholder.clear().append(this.loader)
    const Page = this.getPage()
    this.page = new Page(ActiveRoute.param)

    const root = await this.page.getRoot()

    this.$placeholder.clear().append(withFadeIn(root))

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
