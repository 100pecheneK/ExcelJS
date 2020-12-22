import {storage} from '@core/utils'


function getAllKeys() {
  const keys = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key.includes('spreedsheet')) {
      keys.push(key)
    }
  }
  return keys
}


function toHTML({headerTitle, updated, id}) {
  return `
      <li class="dashboard__table__list__record">
          <a href="#spreedsheet/${id}">${headerTitle}</a>
          <strong>
            ${new Date(updated).toLocaleDateString()}
            ${new Date(updated).toLocaleTimeString()}
          </strong>
      </li>
  `
}


export function createRecordsTable() {
  const keys = getAllKeys()
  if (!keys.length) {
    return `<p>Таблиц нет</p>`
  }
  let records = []
  keys.forEach((key) => {
    records.push({...storage(key), id: key.split(':')[1]})
  })
  records = records.sort(function (a, b) {
    let c = new Date(a.updated)
    let d = new Date(b.updated)
    return d - c
  })
  return `
    <div class="dashboard__table__header">
        <span>Название</span>
        <span>Дата открытия</span>
    </div>
    <ul class="dashboard__table__list">
        ${records.map(toHTML).join('')}
    </ul>
    `
}

