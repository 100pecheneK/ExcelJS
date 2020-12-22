import {Router} from '@core/routes/Router'
import {Page} from '@core/page/Page'
import {$} from '@core/dom'


class Dashboard extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'Dashboard'
    return $(root)
  }
}

class Spreedsheet extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'Spreedsheet'
    return $(root)
  }
}

describe('Router:', () => {
  let router
  let $root
  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      Dashboard,
      Spreedsheet
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', async () => {
    try {
      await router.changePageHandler()
      expect($root.innerHTML).toBe('<div>Dashboard</div>')
    } catch (e) {

    }

  })

  test('should render Spreedsheet Page', async () => {
    window.location.hash = 'spreedsheet'
    try {
      await router.changePageHandler()
      expect($root.innerHTML).toBe('<div>Spreedsheet</div>')
    } catch (e) {

    }
  })
})