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
      {Object.entries(cardIds).map(([id, word]) => (
        <WordCard
          key={id}
          isFlipped={
            state.context.firstPick === id || state.context.secondPick === id
          }
          onFlip={() => send({ type: 'PICK', id })}
          word={word}
        />
      ))}
    </>
  )
}

export default PlayGame
