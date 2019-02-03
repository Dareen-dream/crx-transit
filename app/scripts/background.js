/*
 * TransIt Event
 *
 * jshint strict: true
 */

// Key name to store current text in local storage
const CURRENT_TEXT_KEY = 'transit_current_text'

app.dispatch({
  translate (message) {
    chrome.app.getOptions().then(options => {
      const translator = chrome.app.translators[options.translator]
      translator.translate(message.text)
    })
  },
  selection (message) {
    window.localStorage.setItem(CURRENT_TEXT_KEY, message.text)
  },
  currentText (message, sender, sendResponse) {
    sendResponse(window.localStorage.getItem(CURRENT_TEXT_KEY))
  },
  linkInspect (message) {
    if (message.enabled) {
      chrome.browserAction.setIcon({ path: 'images/icon48-link.png' })
    } else {
      chrome.browserAction.setIcon({ path: 'images/icon48.png' })
    }
  }
})

// Listen to extension update and show update notes
chrome.runtime.onInstalled.addListener(details => {
  if (details.reason === 'update') {

  }
})
