export interface Option<T> {
  startChar: string
  endChar: string
  cb?: (str: string) => T
  isLazy?: boolean
}

export type Mathing<T = any> = (str: string, option: Option<T>) => T[]

/**
 * step: init => start => init...
 *
 * @enum {number}
 */
export enum Status {
  init,
  start
}

const mathing: Mathing = (str = '', option) => {
  const { startChar = '', endChar = '', cb, isLazy = false } = option
  const strList: string[] = []
  let tempStrArr: string[] = []
  let status = Status.init

  const push = (trigger = false) => {
    let str = tempStrArr.join('')
    if (!str) {
      return
    }
    if (trigger && cb) {
      str = cb(str)
    }
    strList.push(str)
    tempStrArr = []
  }

  for (let i = 0; i < str.length; i++) {
    const length = Status.init ? startChar.length : endChar.length
    const val = str.slice(i, i + length)
    i+=(length - 1)
    if (val === startChar && status === Status.init) {
      status = Status.start
      push()
      continue
    }
    if (val === endChar && status === Status.start) {
      status = Status.init
      push(true)
      continue
    }
    tempStrArr.push(val)
  }
  push()

  return strList
}

export const mathingByRegExp: Mathing = (str = '', option) => {
  const { startChar = '', endChar = '', cb, isLazy = false } = option

  const regexp = new RegExp(`${startChar}(\\S*${isLazy ? '?' : ''})${endChar}`)
  return str.split(regexp).filter(x => !!x)
}

export default mathing
