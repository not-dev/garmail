const sendMessageAsync = (
  tabId: Parameters<typeof chrome.tabs.sendMessage>[0],
  message: Parameters<typeof chrome.tabs.sendMessage>[1],
  options?: Parameters<typeof chrome.tabs.sendMessage>[2]
) => {
  if (typeof options === 'undefined') {
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, message, (res) => {
        resolve(res)
      })
    })
  } else {
    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, message, options, (res) => {
        resolve(res)
      })
    })
  }
}

const sendChromeMessage = async (msg: string | Record<string, unknown>): Promise<string> => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  const tab = tabs[0]?.id
  if (typeof tab === 'undefined') throw new Error('tab is undefined')
  const res = await sendMessageAsync(tab, msg)
  return String(res)
}

export { sendChromeMessage }
