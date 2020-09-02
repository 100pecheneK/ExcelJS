import {} from '@core/dom'


export class Emitter {
  constructor() {
    this.listeners = {}
  }

  /**
   * @param {string} event
   * @param {any} args
   * @return {boolean}
   */
  emit(event, ...args) {
    if (Array.isArray(this.listeners[event])) {
      this.listeners[event].forEach(cb => cb(...args))
      return true
    }
    return false
  }

  /**
   * @param {string} event
   * @param {function} callback
   */
  on(event, callback) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(callback)
    return () => {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }

  /**
   *
   * @param {string} event
   * @param {function} callback
   */
  off(event, callback) {
    if (Object.keys(this.listeners).includes(event)) {
      this.listeners[event] = this.listeners[event].filter(cb => cb !== callback)
    }
  }
}

const emitter = new Emitter()


