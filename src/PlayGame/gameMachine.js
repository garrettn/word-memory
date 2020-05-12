import { Machine, assign } from 'xstate'

const words = ['foo', 'bar', 'baz', 'qux']

const gameMachine = Machine(
  {
    id: 'playGame',
    initial: 'idle',
    context: {
      collectedWords: words.reduce((cards, word) => {
        cards[word] = false
        return cards
      }, {}),
      firstPick: null,
      secondPick: null,
    },
    states: {
      idle: {
        on: {
          PICK: {
            target: 'onePicked',
            actions: ['pickFirst'],
          },
        },
      },
      onePicked: {
        on: {
          PICK: {
            target: 'twoPicked',
            actions: ['pickSecond'],
          },
        },
      },
      twoPicked: {},
      isMatch: {},
      isNotMatch: {},
      end: {},
    },
  },
  {
    actions: {
      pickFirst: assign({
        firstPick: (context, event) => event.id,
      }),
      pickSecond: assign({
        secondPick: (context, event) => event.id,
      }),
    },
  }
)

export default gameMachine
