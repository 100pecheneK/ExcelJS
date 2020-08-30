import {$} from '@core/dom'
import {Emitter} from '@core/Emitter'


export class Excel {
  constructor(selector, {components = []}) {
    this.$el = $(selector)
    this.components = components
    this.emitter = new Emitter()
  }

  getRoot() {
    const $root = $.create('div', 'excel')
    const componentOptions = {
      emitter: this.emitter
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

  render() {
    this.$el.append(this.getRoot())
    this.components.forEach(component => component.init())
  }

  destroy() {
    this.components.forEach(component => component.destroy())
  }
}