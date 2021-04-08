import { validate } from 'email-validator'

type GrnEmailAddress = {
  username: string
  email: string
}

const validateGrn = (s:string): false | string | GrnEmailAddress => {
  if (validate(s)) {
    return s
  } else {
    const regexes = [
      /(^"(?<username>[^"<>]*?)"\s+<(?<email>.+@.+)>)/,
      /(^(?<username>[^"<>]*?)\s+<(?<email>.+@.+)>)/
    ]
    const matches = regexes.map(r => r.exec(s))
    return matches.reduce((pre: false|GrnEmailAddress, m) => {
      if (
        (m != null) && (m.length > 1) &&
        (m.groups?.username) && (m.groups?.email) &&
        (validate(m.groups.email))
      ) {
        return ({
          username: m.groups?.username,
          email: m.groups?.email
        })
      }
      return pre
    }, false)
  }
}

export { validateGrn }
