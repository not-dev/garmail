console.log('receiver')

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    console.log('受信')
    console.log(request, sender)
    sendResponse(true)
  }
)
