import { getRequestToken, postRequest } from '@api/garoon'
import { escapeXML } from '@utils'

const getAccountId = async ():Promise<string|undefined> => {
  const res = await postRequest('/g/cbpapi/mail/api.csp?', {
    action: 'MailGetProfiles',
    parameters: '<parameters include_system_profile="false"></parameters>'
  })
  const mailProfiles = res.body.returns?.getElementsByTagName('from_name') || []
  const accountId = Array.from(mailProfiles).map(elem => elem.getAttribute('account_id'))[0] || undefined
  return accountId
}

const getSignature = async (accountId: string):Promise<Array<{ name: string, content: string }|undefined>> => {
  const res = await postRequest('/g/cbpapi/mail/api.csp?', {
    action: 'MailGetSignatures',
    parameters: `<parameters account_id="${accountId}"></parameters>`
  })
  const Elements = res.body.returns?.getElementsByTagName('signature') || []
  const signature = Array.from(Elements).map(elem => {
    const name = elem.getAttribute('name')
    const content = elem.getAttribute('content')
    if ((name != null) && (content != null)) {
      return ({ name, content })
    } else {
      return undefined
    }
  })
  return signature
}

const getEmail = async (id:string):Promise<string|undefined> => {
  const res = await postRequest('/g/cbpapi/mail/api.csp?', {
    action: 'MailGetAccountsById',
    parameters: `<parameters><account_id xmlns="">${id}</account_id></parameters>`
  })
  const email = res.body.returns?.getElementsByTagName('account')[0]?.getAttribute('email') || undefined

  return email
}

const sendMail = async ({ to, subject, body, cc }: { to:string|string[], subject:string, body:string, cc?:string|string[] }):Promise<ReturnType<typeof postRequest> extends Promise<infer T> ? T : never> => {
  const token = await getRequestToken()

  if (typeof token === 'undefined') { throw new Error('token is undefined') }

  const accountId = await getAccountId()

  if (typeof accountId === 'undefined') { throw new Error('accountId is undefined') }

  const email = await getEmail(accountId)

  if (typeof email === 'undefined') { throw new Error('email is undefined') }

  const toStr = (typeof to === 'string') ? escapeXML(to) : to.map(s => escapeXML(s)).join(',')
  const ccStr = (typeof cc === 'undefined') ? '' : (typeof cc === 'string') ? escapeXML(cc) : cc.map(s => escapeXML(s)).join(',')

  const params = `\
<parameters>
  <request_token>${token}</request_token>
  <send_mail xmlns=""
    account_id="${accountId}"
    from_string="${email}"
    to_string="${toStr}"
    cc_string="${ccStr}"
    >
    <mail xmlns="" key="dummy" version="dummy" folder_key="1"
      subject="${subject}"
      body="${body}"
      >
    </mail>
  </send_mail>
</parameters>
`
  console.log(params)

  const res = await postRequest('/g/cbpapi/mail/api.csp?', {
    action: 'MailSendMails',
    parameters: params
  })

  console.log(res.statusCode)

  return res
}

export { sendMail, getAccountId, getEmail, getSignature }
