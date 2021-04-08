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

export { sleep }
