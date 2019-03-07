function updateCheckboxValue (event) {
  const $checkbox = $(event.target)
  const name = $checkbox.attr('name')
  const value = $checkbox.prop('checked')
  app.setOptions({ [name]: value })
}

function init (options) {
  $('[name="pageInspect"]').prop('checked', options.pageInspect)
  $('[name="linkInspect"]').prop('checked', options.linkInspect)
  $(document).on('change', ':checkbox', updateCheckboxValue)
}

app.getOptions().then(init)
