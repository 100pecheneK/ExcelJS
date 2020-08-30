import {ExcelComponent} from '@core/ExcelComponent'


export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($wrapper, options) {
    super($wrapper, {
      name: 'Header',
      ...options
    })

  }

  toHTML() {
    return `
        <input type="text" value="Новая таблица" class="input excel__header__input"/>
        <div>
            <div class="excel__header__button">
                <span class="material-icons">exit_to_app</span>
            </div>
            <div class="excel__header__button">
                <span class="material-icons">delete</span>
            </div>
        </div>
    `
  }
}