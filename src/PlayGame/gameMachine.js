import { Machine } from 'xstate'

const words = ['foo', 'bar', 'baz', 'qux']

const gameMachine = Machine({
  id: 'playGame',
  initial: 'idle',
  context: {
    collectedWords: words.reduce((cards, word) => {
      cards[word] = false
      return cards
    }, {}),
  },
  states: {
    idle: {},
  },
})

export default gameMachine
