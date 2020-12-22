import {defaultTitle} from '@/constants'


export function createHeader({title}) {
  return `
        <input type="text" value="${title || defaultTitle}" class="input spreedsheet__header__input"/>
        <div>
            <div class="spreedsheet__header__button" data-button="exit">
                <span class="material-icons" data-button="exit">exit_to_app</span>
            </div>
            <div class="spreedsheet__header__button" data-button="remove">
                <span class="material-icons" data-button="remove">delete</span>
            </div>
        </div>
    `
}