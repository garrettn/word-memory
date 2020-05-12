import React from 'react'

function WordCard({ isCollected, isFlipped, onFlip, word }) {
  return (
    <div>
      {isFlipped ? (
        <span>
          {word} {isCollected ? '✅' : ''}
        </span>
      ) : (
        <button onClick={onFlip}>?</button>
      )}
    </div>
  )
}

export default WordCard
