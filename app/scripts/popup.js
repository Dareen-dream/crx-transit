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

function init (options) {
  $('.btn-translator').attr('data-translator', options.translator)
  $('[name="pageInspect"]').prop('checked', options.pageInspect)
  $('[name="linkInspect"]').prop('checked', options.linkInspect)
  $(document).on('change', ':checkbox', updateCheckboxValue)
  $('.btn-translator').on('click', setNextTranslator)
}

app.getOptions().then(init)
