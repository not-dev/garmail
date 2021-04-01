import { getLoginUser, getMailAccountId, getSignature } from '@api/garoon'
import dayjs from 'dayjs'

const vars = {
  clipboard: '%CLIPBOARD%',
  lastName: '%LASTNAME%',
  name: '%NAME%',
  today: '%TODAY%',
  signature: 'SIGNATURE'
}

const repClipboard = async (src: string): Promise<string> => {
  if (src.includes(vars.clipboard)) {
    const res = await navigator.permissions.query({ name: 'clipboard-read' })
    if (res.state === 'denied') { throw new Error('clipboard permissions is denied') }
    const text = await navigator.clipboard.readText()
      .catch(e => {
        if (res.state !== 'granted') throw new Error('clipboard permissions is not granted')
        throw e
      })
    return src.replaceAll(vars.clipboard, text)
  } else {
    return src
  }
}

const repLastName = async (src: string): Promise<string> => {
  if (src.includes(vars.lastName)) {
    const grnName = (await getLoginUser()).name.split(/\s/)[0]
    if (typeof grnName === 'undefined') { throw new Error('Garoon Name is undefined') }
    return src.replaceAll(vars.lastName, grnName)
  } else {
    return src
  }
}

const repName = async (src: string): Promise<string> => {
  if (src.includes(vars.name)) {
    const grnName = (await getLoginUser()).name
    if (typeof grnName === 'undefined') { throw new Error('Garoon Name is undefined') }
    return src.replaceAll(vars.name, grnName)
  } else {
    return src
  }
}

const repDate = (src: string): string => {
  const regex = new RegExp(`%${vars.today.replaceAll('%', '')}(\\[(?<format>.*?)\\])?%`, 'g')
  const matches = src.matchAll(regex)
  return Array.from(new Set(matches)).reduce((pre, m) => {
    const mString = m[0]
    if (mString) {
      const format = m.groups?.format || 'YYYYMMDD'
      const now = dayjs().format(format)
      return pre.replace(mString, now)
    }
    return pre
  }, src)
}

const repSignature = async (src: string): Promise<string> => {
  const regex = new RegExp(`%${vars.signature.replaceAll('%', '')}(\\[(?<index>.*?)\\])?%`, 'g')
  const matches = src.matchAll(regex)
  return await Array.from(new Set(matches)).reduce(async (promise, m) => {
    const pre = await promise
    const mString = m[0]
    if (mString) {
      const index = m.groups?.index ? parseInt(m.groups?.index) : 0
      const grnAccountId = await getMailAccountId()
      if (typeof grnAccountId === 'undefined') throw new Error('AccountID is undefined')
      const grnSignature = (await getSignature(grnAccountId))[index]
      if (typeof grnSignature === 'undefined') throw new Error('Garoon signature is undefined')
      return pre.replace(mString, grnSignature.content)
    }
    return pre
  }, Promise.resolve(src))
}

const replaceTemplate = async (src: string): Promise<string> => {
  let res = src
  const errors = []
  res = await repClipboard(res)
    .catch((e) => {
      console.error(e)
      errors.push('クリップボードを取得できませんでした')
      return res
    })
  res = await repSignature(res)
    .catch((e) => {
      console.error(e)
      errors.push('署名を取得できませんでした')
      return res
    })
  res = await repLastName(res)
    .catch((e) => {
      console.error(e)
      errors.push('名前を取得できませんでした')
      return res
    })
  res = await repName(res)
    .catch((e) => {
      console.error(e)
      errors.push('名前を取得できませんでした')
      return res
    })
  try {
    res = repDate(res)
  } catch (e) {
    console.error(e)
    errors.push('日付を取得できませんでした')
  }
  if (errors.length > 0) window.alert(errors.join('\n'))
  return res
}

export { replaceTemplate }
