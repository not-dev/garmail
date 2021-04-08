import { sendChromeMessage } from '@api/chrome'

type HttpResponse = {
  statusCode: number,
  body: string | Record<string, unknown>
}

const sendMail = async (params: { to:string|string[], subject:string, body:string, cc?:string|string[] }): Promise<HttpResponse> => {
  const msg = {
    action: 'sendMail',
    params: params
  }
  window.alert('送信')
  const res = await sendChromeMessage(msg)
  return ({
    statusCode: 200,
    body: res
  })
}

export { sendMail }
