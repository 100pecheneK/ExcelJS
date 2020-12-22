import {SpreedsheetComponent} from '@core/SpreedsheetComponent'


export class SpreedsheetStateComponent extends SpreedsheetComponent {
  get template() {
    return JSON.stringify(this.state, null, 2)
  }

  initState(initialState = {}) {
    this.state = {...initialState}
  }

  setState(newState) {
    this.state = {...this.state, ...newState}
    this.$wrapper.html(this.template)
  }

}