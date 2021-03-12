/* globals BufferEncoding */

import crypto from 'crypto'
import stream, { pipeline } from 'stream'
import { promisify } from 'util'
/**
 * pipelineのPromiseラッパー
 */
const pipelineAsync = promisify(pipeline)

/**
 * streamからファイル書き出し
 * @param input - 入力文字またはstream
 * @param [encoding=hex] - base64 or hex
 * @returns Hashed string
 */
const sha1 = async (input:string|stream.Readable, encoding:BufferEncoding = 'hex'):Promise<string> => {
  const hasher = crypto.createHash('sha1')
  hasher.setEncoding(encoding)
  if (typeof input === 'string') {
    return hasher.update(input).toString()
  } else {
    await pipelineAsync(input, hasher)
    const res:unknown = hasher.read()
    if (typeof res !== 'string') throw new Error('Result is not string')
    return res
  }
}

export { sha1 }
