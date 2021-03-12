import { validate } from 'email-validator'

const validateGrn = (s:string): boolean | Record<string, unknown> => {
  if (validate(s)) {
    return true
  } else {
    const regex = /^"?(?<username>.*?)"?\s*<(?<email>.+)>$/
    const m = regex.exec(s)
    if ((m != null) && (m.length > 1) && (validate(m.groups?.email || ''))) {
      return ({ ...m.groups })
    } else {
      return false
    }
  }
}

export { validateGrn }
