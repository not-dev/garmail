import type { PathLike } from 'fs'
import * as fs from 'fs'
import * as pathlib from 'path'
import { pipeline } from 'stream'
import { promisify } from 'util'

/**
 * pipelineのPromiseラッパー
 */
const pipelineAsync = promisify(pipeline)

const exists = async (path:PathLike):Promise<boolean> => {
  return await fs.promises.access(path)
    .then(() => { return true })
    .catch((err:NodeJS.ErrnoException) => {
      if (err.code === 'ENOENT') {
        return false
      } else {
        throw err
      }
    })
}

/**
 * ファイルのリネーム・パスの移動
 * @param from old path
 * @param to new path
 * @param [mode=wx] If 'w', the new path will be overwritten if it already exists
 */
const rename = async (from:string, to:string, mode:'w'|'wx' = 'wx'):Promise<void> => {
  if ((mode === 'w')) {
    await fs.promises.mkdir(pathlib.dirname(to), {
      recursive: true
    })
    await fs.promises.rename(from, to).catch(async (err:NodeJS.ErrnoException) => {
      if (err.code === 'EPERM') {
        // リネーム先のディレクトリが存在する
        const res = await fs.promises.readdir(from)
          .catch((e:NodeJS.ErrnoException) => { if (e.code !== 'ENOTDIR') throw e })
        if (typeof res !== 'undefined') {
          if (res.length > 0) {
            await Promise.all(res.map(child => rename(pathlib.join(from, child), pathlib.join(to, child))))
          } else {
            await fs.promises.rmdir(from)
          }
        }
      } else {
        throw err
      }
    })
  } else if (!(await exists(to))) {
    await fs.promises.mkdir(pathlib.dirname(to), {
      recursive: true
    })
    await fs.promises.rename(from, to)
  } else {
    // throw EEXIST Error
    await fs.promises.open(to, 'wx')
  }
}

const isDirectory = async (p:PathLike):Promise<boolean> => {
  const distStats = await fs.promises.lstat(p)
    .catch((e:NodeJS.ErrnoException) => { if (e.code !== 'ENOENT') throw e })
  return ((typeof distStats !== 'undefined') && distStats.isDirectory())
}

const rmdirRecursiveParent = async (p:string):Promise<void> => {
  const parent = pathlib.dirname(p)
  const fail = await fs.promises.rmdir(p)
    .catch((err:NodeJS.ErrnoException) => {
      if ((err.code === 'ENOENT') || (err.code === 'ENOTEMPTY')) {
        console.log(`${pathlib.basename(p)} is not empty directory`)
        return true
      } else {
        throw err
      }
    })
  if (!fail) await rmdirRecursiveParent(parent)
}

const rmdirRecursiveChild = async (p:string):Promise<void> => {
  if (await isDirectory(p)) {
    const res = await fs.promises.readdir(p)
      .catch((e:NodeJS.ErrnoException) => { if (e.code !== 'ENOTDIR') throw e })
    if (typeof res !== 'undefined') {
      if (res.length > 0) {
        await Promise.all(res.map(child => rmdirRecursiveChild(pathlib.join(p, child))))
      } else {
        await fs.promises.rmdir(p)
      }
    }
  }
}

export { pipelineAsync, rename, exists, isDirectory, rmdirRecursiveParent, rmdirRecursiveChild }
