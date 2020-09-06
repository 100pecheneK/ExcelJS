export function createStore(rootReducer, initialState = {}) {
  let state = rootReducer({...initialState}, {type: '__INIT__'})
  let listeners = []

  return {
    /**
     * @param {function} cb
     * @return {{unsubscribe(): void}}
     */
    subscribe(cb) {
      listeners.push(cb)
      return {
        unsubscribe() {
          listeners = listeners.filter(l => l !== cb)
        }
      }
    },
    /**
     * @param {{type:string,...}} action
     */
    dispatch(action) {
      state = rootReducer(state, action)
      listeners.forEach(listener => listener(state))
    },
    /**
     * @return {{}}
     */
    getState() {
      return JSON.parse(JSON.stringify(state))
    }
  }
}