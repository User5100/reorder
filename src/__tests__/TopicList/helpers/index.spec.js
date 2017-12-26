import {
  clamp,
  reinsert
} from '../../../TopicList/helpers'

test('expect clamp to return correct value ', () => {
  var n = 4,
      min = 3,
      max = 5,
      output = clamp(n, min, max)

  expect(output).toBe(4)
})

test.skip('expect reinsert to return correct value ', () => {

})