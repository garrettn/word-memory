import React from 'react'
import classnames from 'classnames'
import styles from './WordCard.module.css'

function WordCard({ isCollected, isCorrect, isPicked, onPick, word }) {
  const isFaceUp = isPicked || isCorrect || isCollected
  return (
    <div className={classnames(styles.card, { [styles.isFaceUp]: isFaceUp })}>
      <div className={styles.face}>
        <span>
          {word} {isCorrect || isCollected ? '✅' : ''}
        </span>
      </div>
      <button className={styles.back} onClick={onPick}>
        ?
      </button>
    </div>
  )
}

export default WordCard
