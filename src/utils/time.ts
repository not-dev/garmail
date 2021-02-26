/**
 * Sleep function
 * @param sec - number
 * @exsample const func = async () => {
 *  await sleep(1)
 * }
 */
const sleep = async (sec: number):Promise<void> => {
  return await new Promise((resolve) => {
    setTimeout(resolve, sec * 1000)
  })
}

type GetDateStringOpts = { digits?:{year?:number, month?:number, day?:number}, sep?:string }

type GetDateString = {
  (date?:Date, opts?:GetDateStringOpts):string
  (opts?:GetDateStringOpts):string
}

const getDateString:GetDateString = (...args:any[]):any => {
  let date: Date
  let opts: GetDateStringOpts
  if (args.length > 0) {
    if (args[0] instanceof Date) {
      date = args[0]
      opts = args[1] as GetDateStringOpts
    } else {
      date = new Date()
      opts = args[0] as GetDateStringOpts
    }
  } else {
    date = new Date()
    opts = {}
  }
  const { digits, sep } = opts
  const dig = {
    year: 4,
    month: 2,
    day: 2,
    ...digits
  }
  const year = date.getUTCFullYear()
  const month = date.getUTCMonth() + 1
  const day = date.getUTCDate()

  const y = (dig.year !== 0) && ('0'.repeat(dig.year) + year.toString()).slice(-dig.year)
  const m = (dig.month !== 0) && ('0'.repeat(dig.month) + month.toString()).slice(-dig.month)
  const d = (dig.day !== 0) && ('0'.repeat(dig.day) + day.toString()).slice(-dig.day)

  return [y, m, d].filter(i => i).join(sep || '')
}

export { sleep, getDateString }
