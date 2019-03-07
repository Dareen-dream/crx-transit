const DEFAULTS = {
  // 页面划词结果显示时间
  notifyTimeout: 5,

  // 是否启用页面划词
  pageInspect: true,

  // 是否启用链接划词
  linkInspect: true,

  // 是否推送单词到服务端,
  pushItem: false,

  // 结果默认显示在右上角
  notifyMode: 'margin',

  // 默认的翻译服务
  translator: 'youdao'
}

const app = {
  translators: {},

  registerTranslator (translator) {
    this.translators[translator.name] = translator
  },

  dispatch (dispatcher) {
    chrome.runtime.onMessage.addListener((message, sender, response) => {
      const handler = dispatcher[message.type]
      handler && handler(message, sender, response)
      return true
    })
  },

  openExtensionPage (filename) {
    var url = chrome.extension.getURL(filename)

    chrome.tabs.query({}, tabs => {
      var tab = tabs.find(tab => tab.url.indexOf(url) !== -1)

      if (tab) {
        chrome.tabs.reload(tab.id)
        chrome.tabs.update(tab.id, { active: true })
      } else {
        chrome.tabs.create({ url })
      }
    })
  },

  getOptions () {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.get(null, function (options) {
        resolve(Object.assign({}, DEFAULTS, options))
      })
    })
  },

  setOptions (options) {
    return new Promise((resolve, reject) => {
      chrome.storage.sync.set(options, () => resolve())
    })
  },

  renderTranslation (query, result) {
    let phonetic = ''
    let translation = '未找到释义'
    let className = 'transit-warning'

    if (result) {
      phonetic = result.phonetic
      translation = result.translation
      className = 'transit-success'
    }

    return `` +
      `<div class="transit-result ${className}">` +
      `  <h6>${query}</h6>` +
      `  <code>${phonetic || ''}</code>` +
      `  <pre>${translation}</pre>` +
      `</div>`
  },

  getComputedPosition (position) {
    const $elem = $('<div class="transit-spirit"></div>').appendTo('body')
    $elem.css(position)

    const computedStyle = window.getComputedStyle($elem.get(0))
    const computedPosition = {
      left: computedStyle.left,
      top: computedStyle.top,
      right: computedStyle.right,
      bottom: computedStyle.bottom
    }

    $elem.remove()
    return computedPosition
  },

  getPosition (evt, selection) {
    const rect = selection.getRangeAt(0).getBoundingClientRect()
    const scroll = { x: window.pageXOffset, y: window.pageYOffset }

    // 如果选中的文本是在文本框中，则使用鼠标位置
    let position = null
    if (rect.left === 0 && rect.top === 0) {
      position = { left: evt.clientX, top: evt.clientY, height: 24 }
    } else {
      position = { left: rect.left + scroll.x, top: rect.top + scroll.y, height: rect.height }
    }

    // 生成一个临时元素以获取精准定位
    var computedPosition = this.getComputedPosition(position)

    if (position.top >= 150) {
      return { left: position.left, bottom: parseFloat(computedPosition.bottom) + rect.height + 10 }
    } else {
      return { left: position.left, top: parseFloat(computedPosition.top) + rect.height + 10 }
    }
  },

  getSelection (evt) {
    const selection = window.getSelection()
    const text = selection.toString().trim()

    if (text) {
      return { text: text, position: this.getPosition(evt, selection) }
    } else {
      return null
    }
  },

  sanitizeHTML (html) {
    var match = html.match(/<body[\s\S]*<\/body>/img)
    return match[0]
      .replace(/<script([\s\S]*?)<\/script>/img, '')
      .replace(/<style([\s\S]*?)<\/style>/img, '')
      .replace(/<img([\s\S]*?)>/img, '')
      .replace(/<video([\s\S]*?)>/img, '')
  }
}

window.app = app
