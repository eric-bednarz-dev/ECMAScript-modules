import { result, suite } from './test.js'
import { dictionary } from './dictionary.js'

const test = suite(import.meta)

export default result(test)

test
  ('the stringTag of a dictionary is Dictionary', [
    Object
      .prototype
      .toString
      .call(dictionary({})),
    '[object Dictionary]',
  ])
  ('a dictionary has no constructor', [
    dictionary({}).constructor,
    undefined,
  ])
  ('a dictionary has no prototype', [
    dictionary({}).prototype,
    undefined,
  ])
  ('a dictionary throws on property reassignment', () => {
    const data = dictionary({
      answer: 42,
    })
    try {
      data.answer = -1
      return false
    } catch (error) {
      return error instanceof Error
    }
  })
  ('a dictionary throws on property addition', () => {
    const data = dictionary({
      answer: 42,
    })
    try {
      data.question = -1
      return false
    } catch (error) {
      return error instanceof Error
    }
  })
  ('a dictionary throws on property deletion', () => {
    const data = dictionary({
      answer: 42,
    })
    try {
      delete data.answer
      return false
    } catch (error) {
      return error instanceof Error
    }
  })
  ('a dictionary is enumerable', () => {
    const data = dictionary({
      answer: 42,
    })
    return [
      JSON.stringify(Object.entries(data)),
      '[["answer",42]]',
    ]
  })
  ('a dictionary does not take symbol properties', () => {
    const data = dictionary({
      [Symbol('example')]: 'symbol example',
    })
    return [
      JSON.stringify(data.getOwnPropertySymbols),
      undefined,
    ]
  })
