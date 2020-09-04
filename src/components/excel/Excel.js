import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'
import {StoreSubscriber} from '@core/StoreSubscriber'
import * as actions from '@/redux/actions'
import {preventDefault} from '@core/utils'


export class Excel {
  constructor({components = [], store}) {
    this.components = components
    this.store = store
    this.emitter = new Emitter()
    this.subscriber = new StoreSubscriber(this.store)
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter,
      store: this.store
    }
    this.components = this.components.map(Component => {
      const $wrapper = $.create('div', Component.className)
      const component = new Component($wrapper, componentOptions)
      $wrapper.html(component.toHTML())
      $root.append($wrapper)
      return component
    })

    return $root
  }

  init() {
    if (process.env.NODE_ENV === 'production') {
      document.addEventListener('contextmenu', preventDefault)
    }
    this.store.dispatch(actions.updateDate(new Date()))
    this.subscriber.subscribeComponents(this.components)
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.subscriber.unsubscribe()
    this.components.forEach(component => component.destroy())
    document.removeEventListener('contextmenu', preventDefault)
  }
}