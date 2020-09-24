import {Router} from '@core/routes/Router'
import {Page} from '@core/page/Page'


class Dashboard extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'Dashboard'
    return root
  }
}

class Excel extends Page {
  getRoot() {
    const root = document.createElement('div')
    root.innerHTML = 'Excel'
    return root
  }
}

describe('Router:', () => {
  let router
  let $root
  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      Dashboard,
      Excel
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should render Dashboard Page', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>Dashboard</div>')
  })

  test('should render Excel Page', () => {
    window.location.hash = 'excel'
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>Excel</div>')
  })
})