function updateRadioValue (evt) {
  const name = $(evt.target).attr('name')
  let value = $(`[name="${name}"]:checked`).val()
  if (value in ['true', 'false']) {
    value = JSON.parse(value)
  }

  app.setOptions({ [name]: value })
}

function updateRangeValue (evt) {
  const $range = $(evt.target)
  const name = $range.attr('name')
  const value = $range.val()
  app.setOptions({ [name]: parseInt(value) })
  $range.next().html(`${value} 秒`)
}

function init (options) {
  $(`[name="translator"][value="${options.translator}"]`).prop('checked', true)
  $(`[name="pageInspect"][value="${options.pageInspect}"]`).prop('checked', true)
  $(`[name="linkInspect"][value="${options.linkInspect}"]`).prop('checked', true)
  $(`[name="notifyMode"][value="${options.notifyMode}"]`).prop('checked', true)
  $('.notify-timeout').find('input').val(options.notifyTimeout)
  $('.notify-timeout').find('span').html(`${options.notifyTimeout} 秒`)

  $(document).on('change', '[type=radio]', updateRadioValue)
  $(document).on('change', '[type=range]', updateRangeValue)
}

app.getOptions().then(init)
