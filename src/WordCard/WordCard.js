import React from 'react'
import classnames from 'classnames'
import { HelpCircle } from 'react-feather'
import styles from './WordCard.module.css'

function WordCard({ isCollected, isCorrect, isPicked, onPick, word }) {
  const isFaceUp = isPicked || isCorrect || isCollected
  return (
    <div className={classnames(styles.card, { [styles.isFaceUp]: isFaceUp })}>
      <div className={styles.flipper}>
        <div
          className={classnames(styles.face, {
            [styles.isCorrect]: isCorrect,
            [styles.isCollected]: isCollected,
          })}
        >
          <span className={styles.word}>
            {word} {isCorrect || isCollected ? '✅' : ''}
          </span>
        </div>
        <button className={styles.back} onClick={onPick} aria-label="Flip card">
          <HelpCircle className={styles.backIcon} />
        </button>
      </div>
    </div>
  )
}

export default WordCard
