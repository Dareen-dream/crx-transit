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
  dispatch (dispatcher) {
    chrome.runtime.onMessage.addListener((message, sender, response) => {
      const handler = dispatcher[message.type]
      handler && handler(message, sender, response)
      return true
    })
  },

  openExtensionPage (filename) {
    var optionsUrl = chrome.extension.getURL(filename)

    chrome.tabs.query({}, tabs => {
      var optionTab = tabs.find({ url: optionsUrl })

      if (optionTab) {
        chrome.tabs.reload(optionTab.id)
        chrome.tabs.update(optionTab.id, { highlighted: true })
      } else {
        chrome.tabs.create({ url: optionsUrl })
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
  }
}

window.app = app
