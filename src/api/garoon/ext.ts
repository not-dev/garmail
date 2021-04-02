import { validate } from 'email-validator'

type GrnEmailAddress = {
  username: string
  email: string
}

const validateGrn = (s:string): false | string | GrnEmailAddress => {
  if (validate(s)) {
    return s
  } else {
    const regex = /^"?(?<username>.*?)"?\s*<(?<email>.+)>$/
    const m = regex.exec(s)
    if ((m != null) && (m.length > 1) && (m.groups?.username) && (m.groups?.email) && (validate(m.groups.email))) {
      return ({
        username: m.groups?.username,
        email: m.groups?.email
      })
    } else {
      return false
    }
  }
}

const getSubdomain = (): string => {
  const host = window.location.hostname
  const subdomain = host.split('.cyboze.com')[0] || host
  return subdomain
}

export { validateGrn, getSubdomain }
