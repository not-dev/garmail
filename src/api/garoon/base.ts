import { getUserId, postRequest } from '@api/garoon'

type User = {
  id: string
  email: string
  name: string
}

const location = '/g/cbpapi/base/api.csp?'

const getLoginUser = async (): Promise<User> => {
  if ((!'%Name%'.includes('%')) && (!'%Mail%'.includes('%')) && (!'%ID%'.includes('%'))) {
    return ({
      id: '%ID%',
      email: '%Mail%',
      name: '%Name%'
    })
  }

  console.warn('Garoon HTMLportlet keyword unable')

  const id = await getUserId()

  const res = await postRequest(location, {
    action: 'BaseGetUsersById',
    parameters: `<parameters><user_id>${id}</user_id> </parameters>`
  })
  const userDom = res.body.returns?.getElementsByTagName('user')[0]

  if (typeof userDom === 'undefined') { throw new Error('user is undefined') }

  const user = {
    id,
    email: userDom.getAttribute('email') || '',
    name: userDom.getAttribute('name') || ''
  }

  return user
}

export { getLoginUser }
