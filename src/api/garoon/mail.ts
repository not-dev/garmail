import { getRequestToken, postRequest } from '@api/garoon'
import { escapeXML } from '@util'

const location = '/g/cbpapi/mail/api.csp?'

const getMailAccountId = async ():Promise<string> => {
  const res = await postRequest(location, {
    action: 'MailGetProfiles',
    parameters: '<parameters include_system_profile="false"></parameters>'
  })
  const mailProfiles = res.body.returns?.getElementsByTagName('from_name') || []
  const mailAccountId = Array.from(mailProfiles).map(elem => elem.getAttribute('account_id'))[0] || undefined

  if (typeof mailAccountId === 'undefined') { throw new Error('Mail account ID is undefined') }

  return mailAccountId
}

const getSignature = async (accountId: string):Promise<Array<{ name: string, content: string }|undefined>> => {
  const res = await postRequest(location, {
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

const getEmail = async (id:string):Promise<string> => {
  const res = await postRequest(location, {
    action: 'MailGetAccountsById',
    parameters: `<parameters><account_id xmlns="">${id}</account_id></parameters>`
  })
  const email = res.body.returns?.getElementsByTagName('account')[0]?.getAttribute('email') || undefined

  if (typeof email === 'undefined') { throw new Error('email is undefined') }

  return email
}

const sendMail = async ({ to, subject, body, cc }: { to:string|string[], subject:string, body:string, cc?:string|string[] }):Promise<ReturnType<typeof postRequest> extends Promise<infer T> ? T : never> => {
  const token = await getRequestToken()

  const mailAccountId = await getMailAccountId()

  const email = await getEmail(mailAccountId)

  const toStr = (typeof to === 'string') ? escapeXML(to) : to.map(s => escapeXML(s)).join(',')
  const ccStr = (typeof cc === 'undefined') ? '' : (typeof cc === 'string') ? escapeXML(cc) : cc.map(s => escapeXML(s)).join(',')

  const params = `\
<parameters>
  <request_token>${token}</request_token>
  <send_mail xmlns=""
    account_id="${mailAccountId}"
    from_string="${email}"
    to_string="${toStr}"
    cc_string="${ccStr}"
    >
    <mail xmlns="" key="dummy" version="dummy" folder_key="1"
      subject="${escapeXML(subject)}"
      body="${escapeXML(body)}"
      >
    </mail>
  </send_mail>
</parameters>
`
  console.log(params)

  const res = await postRequest(location, {
    action: 'MailSendMails',
    parameters: params
  })

  console.log(res.statusCode)

  return res
}

export { sendMail, getMailAccountId, getEmail, getSignature }
