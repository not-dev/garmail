import { postRequest } from '@api/garoon'

const location = '/g/util_api/util/api.csp?'

const getRequestToken = async (): Promise<string> => {
  const res = await postRequest(location, {
    action: 'UtilGetRequestToken',
    parameters: '<parameters></parameters>'
  })
  const token = res.body.returns?.getElementsByTagName('request_token')[0]?.innerHTML

  if (typeof token === 'undefined') { throw new Error('token is undefined') }

  return token
}

const getUserId = async (): Promise<string> => {
  const res = await postRequest(location, {
    action: 'UtilGetLoginUserId',
    parameters: '<parameters></parameters>'
  })
  const id = res.body.returns?.getElementsByTagName('user_id')[0]?.innerHTML

  if (typeof id === 'undefined') { throw new Error('User id is undefined') }

  return id
}

export { getRequestToken, getUserId }
