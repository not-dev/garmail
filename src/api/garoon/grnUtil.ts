import { postRequest } from '@api/garoon'

const getRequestToken = async ():Promise<string|undefined> => {
  const res = await postRequest('/g/util_api/util/api.csp?', {
    action: 'UtilGetRequestToken',
    parameters: '<parameters></parameters>'
  })
  const token = res.body.returns?.getElementsByTagName('request_token')[0]?.innerHTML

  return token
}

const getSubdomain = ():string => {
  const host = window.location.hostname
  const subdomain = host.split('.cyboze.com')[0] || host
  return subdomain
}

export { getRequestToken, getSubdomain }
