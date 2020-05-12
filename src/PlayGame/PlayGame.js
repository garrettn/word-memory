import React from 'react'
import { useMachine } from '@xstate/react'
import WordCard from '../WordCard'
import gameMachine from './gameMachine'

const words = ['foo', 'bar', 'baz', 'qux']

function PlayGame() {
  const [state, send] = useMachine(gameMachine, { devTools: true })
  return (
    <>
      <h1>Play Game!</h1>
      {state.value === 'isMatch' ? <p>You got a match!</p> : null}
      {state.value === 'isNotMatch' ? <p>Try again!</p> : null}
      {state.value === 'end' ? <p>You win!</p> : null}
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
