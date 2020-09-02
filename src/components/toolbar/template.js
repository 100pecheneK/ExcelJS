function createButton(button) {
  const classes = [
    button.active ? 'excel__toolbar__button--active' : '',
  ]
  const meta = `
    data-type="button"
    data-value='${JSON.stringify(button.value)}'
  `
  return `
      <div 
      class="excel__toolbar__button ${classes.join(' ')}"
      ${meta}
      >
          <span ${meta} class="material-icons">${button.icon}</span>
      </div>
    `
}

/**
 * @param {object} state
 * @return {string}
 */
export function createToolbar(state) {

  const buttons = [
    {
      icon: 'format_bold',
      value: {fontWeight: state['fontWeight'] === 'bold' ? 'normal' : 'bold'},
      active: state['fontWeight'] === 'bold',
    },
    {
      icon: 'format_italic',
      value: {fontStyle: state['fontStyle'] === 'italic' ? 'normal' : 'italic'},
      active: state['fontStyle'] === 'italic',
    },
    {
      icon: 'format_underline',
      value: {textDecoration: state['textDecoration'] === 'underline' ? 'none' : 'underline'},
      active: state['textDecoration'] === 'underline',
    },
    {
      icon: 'format_align_left',
      value: {textAlign: 'left'},
      active: state['textAlign'] === 'left',
    },
    {
      icon: 'format_align_center',
      value: {textAlign: 'center'},
      active: state['textAlign'] === 'center',
    },
    {
      icon: 'format_align_right',
      value: {textAlign: 'right'},
      active: state['textAlign'] === 'right',
    },
  ]
  return buttons.map(createButton).join('')
}