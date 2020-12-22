import {$} from '@core/dom'
import {ActiveRoute} from '@core/routes/ActiveRoute'
import {Loader} from '@/components/Loader'
import {withFadeIn} from '@core/utils'


export class Router {
  /**
   * @param selector
   * @param {{Dashboard, Spreedsheet}} routes
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
    // clear page nad add loader
    this.$placeholder.clear().append(this.loader)
    // create new page
    const Page = this.getPage()
    this.page = new Page(ActiveRoute.param)
    const root = await this.page.getRoot()
    this.$placeholder.clear().append(withFadeIn(root))
    this.page.afterRender()
  }

  getPage() {
    if (ActiveRoute.path.includes('spreedsheet')) {
      return this.routes.Spreedsheet
    }
    return this.routes.Dashboard
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
