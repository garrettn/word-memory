import React from 'react'
import { useMachine } from '@xstate/react'
import classnames from 'classnames'
import WordCard from '../WordCard'
import createGameMachine from './gameMachine'
import styles from './PlayGame.module.css'

function getMessage(state) {
  switch (state) {
    case 'onePicked':
    case 'twoPicked':
      return 'Pick another card.'
    case 'isMatch':
      return 'You got a match!'
    case 'isNotMatch':
      return 'Try again!'
    case 'end':
      return '🎉 You win! 🎉'
    default:
      return 'Pick a card.'
  }
}

function PlayGame({ words = [] }) {
  const [state, send] = useMachine(createGameMachine(words), { devTools: true })
  return (
    <div className={styles.container}>
      <p
        className={classnames(styles.message, {
          [styles.success]: ['isMatch', 'end'].includes(state.value),
        })}
      >
        {getMessage(state.value)}
      </p>
      <div className={styles.grid}>
        {state.context.cards.map(({ id, word }) => {
          const isPicked = [
            state.context.firstPick.id,
            state.context.secondPick.id,
          ].includes(id)
          return (
            <WordCard
              key={id}
              isCollected={state.context.collectedWords[word]}
              isCorrect={isPicked && state.value === 'isMatch'}
              isPicked={isPicked}
              onPick={() => send({ type: 'PICK', id, word })}
              word={word}
            />
          )
        })}
      </div>
    </div>
  )
}

export default PlayGame
