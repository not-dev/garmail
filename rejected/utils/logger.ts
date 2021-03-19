import * as fs from 'fs'

type Console = typeof console

const origConsole = console

const logger = (log:string, err?:string):Console => {
  const stdout = fs.createWriteStream(log, { flags: 'a' })
  const stderr = err ? fs.createWriteStream(err, { flags: 'a' }) : stdout
  const altConsole = new console.Console(stdout, stderr)
  return {
    ...origConsole,
    log: (s:string) => {
      origConsole.log(s)
      altConsole.log(s)
    },
    info: (s:string) => {
      origConsole.info(s)
      altConsole.log(s)
    },
    warn: (s:string) => {
      origConsole.warn(s)
      altConsole.log(s)
    },
    error: (s:string) => {
      origConsole.error(s)
      altConsole.error(s)
    }
  }
}

const errorLogger = (err:string):Console => {
  const stderr = fs.createWriteStream(err, { flags: 'a' })
  const altConsole = new console.Console(stderr, stderr)
  return {
    ...origConsole,
    error: (s:string) => {
      origConsole.error(s)
      altConsole.error(s)
    }
  }
}

export { logger, errorLogger }
