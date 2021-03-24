import { postRequest } from '@api/garoon'

const getRequestToken = async (): Promise<string | undefined> => {
  const res = await postRequest('/g/util_api/util/api.csp?', {
    action: 'UtilGetRequestToken',
    parameters: '<parameters></parameters>'
  })
  const token = res.body.returns?.getElementsByTagName('request_token')[0]?.innerHTML

  return token
}

const getSubdomain = (): string => {
  const host = window.location.hostname
  const subdomain = host.split('.cyboze.com')[0] || host
  return subdomain
}

type GaroonUser = {
  name: string
  email: string
}

type Garoon = {
  base: {
    user: {
      getLoginUser: () => GaroonUser
    }
  }
}

declare const garoon:Garoon

const getLoginUser = async (): Promise<GaroonUser> => {
  return new Promise((resolve) => {
    const user = garoon.base.user.getLoginUser()
    resolve(user)
  })
}

export { getRequestToken, getSubdomain, getLoginUser }
