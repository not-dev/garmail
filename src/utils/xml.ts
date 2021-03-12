const escapeXML = (str:string):string => {
  const escStr = str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')
  return escStr
}

export { escapeXML }
