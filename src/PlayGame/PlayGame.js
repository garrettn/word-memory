import React from 'react'
import { useMachine } from '@xstate/react'
import WordCard from '../WordCard'
import createGameMachine from './gameMachine'

const words = ['foo', 'bar', 'baz', 'qux']

function Message({ state }) {
  switch (state) {
    case 'onePicked':
      return <p>Pick another card.</p>
    case 'isMatch':
      return <p>You got a match!</p>
    case 'isNotMatch':
      return <p>Try again!</p>
    case 'end':
      return <p>You win!</p>
    default:
      return <p>Pick a card.</p>
  }
}

function PlayGame() {
  const [state, send] = useMachine(createGameMachine(words), { devTools: true })
  return (
    <>
      <h1>Play Game!</h1>
      <Message state={state.value} />
      {state.context.cards.map(({ id, word }) => (
        <WordCard
          key={id}
          isCollected={state.context.collectedWords[word]}
          isFlipped={
            state.context.firstPick.id === id ||
            state.context.secondPick.id === id
          }
          onFlip={() => send({ type: 'PICK', id, word })}
          word={word}
        />
      ))}
    </>
  )
}

export default PlayGame
