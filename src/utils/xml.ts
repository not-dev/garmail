const escapeXML = (str:string):string => {
  const escStr = str
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll('\'', '&apos;')
    .replaceAll('\n\r', '&#xA;')
    .replaceAll('\n', '&#xA;')
  return escStr
}

export { escapeXML }
