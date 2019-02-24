function init (options) {
  $(`[name="translator"][value="${options.translator}"]`).prop('checked', true)
  $(`[name="pageInspect"][value="${options.pageInspect}"]`).prop('checked', true)
  $(`[name="linkInspect"][value="${options.linkInspect}"]`).prop('checked', true)
  $(`[name="notifyMode"][value="${options.notifyMode}"]`).prop('checked', true)
  $('.notify-timeout').find('input').val(options.notifyTimeout)
  $('.notify-timeout').find('span').html(`${options.notifyTimeout} 秒`)
}

app.getOptions().then(init)
