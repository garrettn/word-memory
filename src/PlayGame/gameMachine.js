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
      firstPick: {},
      secondPick: {},
    },
    states: {
      idle: {
        entry: ['clearPicks'],
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
      twoPicked: {
        on: {
          '': [
            { target: 'isMatch', cond: 'checkIsMatch' },
            { target: 'isNotMatch' },
          ],
        },
      },
      isMatch: {
        entry: ['collectWord'],
        after: {
          500: 'idle',
        },
        on: {
          '': {
            target: 'end',
            cond: 'allCollected',
          },
        },
      },
      isNotMatch: {
        after: { 500: 'idle' },
      },
      end: {},
    },
  },
  {
    actions: {
      clearPicks: assign({
        firstPick: {},
        secondPick: {},
      }),
      pickFirst: assign({
        firstPick: (context, { id, word }) => ({ id, word }),
      }),
      pickSecond: assign({
        secondPick: (context, { id, word }) => ({ id, word }),
      }),
      collectWord: assign({
        collectedWords: (context) => ({
          ...context.collectedWords,
          [context.firstPick.word]: true,
        }),
      }),
    },
    guards: {
      checkIsMatch: (context) =>
        context.firstPick.word === context.secondPick.word,
      allCollected: (context) =>
        Object.values(context.collectedWords).every((w) => w),
    },
  }
)

export default gameMachine
