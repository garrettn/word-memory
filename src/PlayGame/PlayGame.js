import React from 'react'
import JSONTree from 'react-json-tree'
import { useMachine } from '@xstate/react'
// import WordCard from '../WordCard'
import gameMachine from './gameMachine'

function PlayGame() {
  const [state, send] = useMachine(gameMachine, { devTools: true })
  return (
    <>
      <h1>Play Game!</h1>
      <JSONTree data={state.toJSON()} />
    </>
  )
}

export default PlayGame
