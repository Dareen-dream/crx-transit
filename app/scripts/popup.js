const TRANSLATORS = ['baidu', 'youdao', 'bing']

function updateCheckboxValue (event) {
  const $checkbox = $(event.target)
  const name = $checkbox.attr('name')
  const value = $checkbox.prop('checked')
  app.setOptions({ [name]: value })
}

function setNextTranslator () {
  const $translator = $(this)
  const translator = $translator.attr('data-translator')
  const index = TRANSLATORS.indexOf(translator) + 1
  const nextTranslator = TRANSLATORS[index % TRANSLATORS.length]
  $translator.attr('data-translator', nextTranslator)
  app.setOptions({ translator: nextTranslator })
}

function openOptionsPage () {
  app.openExtensionPage('pages/options.html')
  window.close()
}

function getCurrentText () {
  const text = window.localStorage['transit_current_text']
  return text || ''
}

function doTranslate () {
  console.log('Not Implemented' + Date.now())
}

let timer = null
function onSourceChanged () {
  clearTimeout(timer)
  timer = window.setTimeout(doTranslate, 500)
}

function init (options) {
  $('#source').val(getCurrentText())
  $('.btn-translator').attr('data-translator', options.translator)
  $('[name="pageInspect"]').prop('checked', options.pageInspect)
  $('[name="linkInspect"]').prop('checked', options.linkInspect)
  $(document).on('change', ':checkbox', updateCheckboxValue)
  $('.btn-translator').on('click', setNextTranslator)
  $('.btn-options').on('click', openOptionsPage)

  $('#source').on('input', onSourceChanged)
}

app.getOptions().then(init)
