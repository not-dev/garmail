console.log('sender')

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  console.log('send')
  chrome.tabs.sendMessage(tabs[0].id, { message: 'hoge' }, (res) => {
    console.log(res)
  })
})

const root = document.getElementById('garmail-root')
root.innerHTML = 'hoge'
root.setAttribute('style', 'height:400px; width: 400px;')
