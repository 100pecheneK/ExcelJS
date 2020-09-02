import {defaultTitle} from '@/constants'


export function createHeader({title}) {
  return `
        <input type="text" value="${title || defaultTitle}" class="input excel__header__input"/>
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