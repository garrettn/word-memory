import { Machine, assign } from 'xstate'
import shuffle from 'fast-shuffle'

function createGameMachine(initialWords) {
  return Machine(
    {
      id: 'playGame',
      initial: 'initializing',
      context: {
        cards: [],
        collectedWords: initialWords.reduce((cards, word) => {
          cards[word] = false
          return cards
        }, {}),
        firstPick: {},
        secondPick: {},
      },
      states: {
        initializing: {
          entry: ['createCards', 'shuffleCards'],
          on: {
            '': 'idle',
          },
        },
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
            2000: 'idle',
          },
          on: {
            '': {
              target: 'end',
              cond: 'allCollected',
            },
          },
        },
        isNotMatch: {
          after: { 2000: 'idle' },
        },
        end: {},
      },
    },
    {
      actions: {
        createCards: assign({
          cards: initialWords.reduce((cs, word) => {
            cs.push({ id: `${word}1`, word }, { id: `${word}2`, word })
            return cs
          }, []),
        }),
        shuffleCards: assign({
          cards: (context) => shuffle(context.cards),
        }),
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
}

export default createGameMachine
