import React from 'react'
import styles from './WordCard.module.css'

function WordCard({ isCollected, isFlipped, onFlip, word }) {
  return (
    <div className={styles.card}>
      {isCollected || isFlipped ? (
        <span>
          {word} {isCollected ? '✅' : ''}
        </span>
      ) : (
        <button onClick={onFlip} className={styles.button}>
          ?
        </button>
      )}
    </div>
  )
}

export default WordCard
