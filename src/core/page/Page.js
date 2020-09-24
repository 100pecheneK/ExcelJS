export class Page {
  constructor(params) {
    // if (!params) {
    //   throw new Error('No params')
    // }
    this.params = params||''
  }

  getRoot() {
    throw new Error('Method "getRoot" should be implemented!')
  }

  afterRender() {

  }

  destroy() {

  }
}