export interface Option<T> {
  /**
   * start chartacter
   */
  startChar: string
  /**
   * end chartacter
   */
  endChar: string
  /**
   * matching map
   */
  cb?: (str: string) => T
  /**
   * greedy mode
   */
  isGreedy?: boolean
}

export type Matching<T = any> = (str: string, option: Option<T>) => T[]

/**
 * step: init => start => init...
 *
 * @enum {number}
 */
export enum Status {
  init,
  start
}

const matching: Matching = (str = '', option) => {
  const { startChar = '', endChar = '', cb, isGreedy = false } = option
  let strList: string[] = []
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
      if (isGreedy) {
        push(true)
        const [ first, ...content ] = strList
        strList = [first, content.join('')]
        tempStrArr.push(val)
      } else {
        push(true)
        status = Status.init
      }
      continue
    }
    tempStrArr.push(val)
  }
  if (isGreedy) {
    tempStrArr.splice(0, 1)
  }
  push()

  return strList
}

/*
export const matchingByRegExp: Matching = (str = '', option) => {
  const { startChar = '', endChar = '', cb, isGreedy = false } = option

  const regexp = new RegExp(`${startChar}(\\S*${isGreedy ? '?' : ''})${endChar}`)
  return str.split(regexp).filter(x => !!x)
}
*/

export default matching
