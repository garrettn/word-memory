import React from 'react'
import { useMachine } from '@xstate/react'
import WordCard from '../WordCard'
import gameMachine from './gameMachine'

const words = ['foo', 'bar', 'baz', 'qux']

function PlayGame() {
  const [state, send] = useMachine(gameMachine, { devTools: true })
  const cardIds = words.reduce((ids, word) => {
    ids[`${word}1`] = word
    ids[`${word}2`] = word
    return ids
  }, {})
  return (
    <>
      <h1>Play Game!</h1>
      {state.value === 'isMatch' ? <p>You got a match!</p> : null}
      {state.value === 'isNotMatch' ? <p>Try again!</p> : null}
      {Object.entries(cardIds).map(([id, word]) => (
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
