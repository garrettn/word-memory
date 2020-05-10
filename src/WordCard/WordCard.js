import React from 'react'

function WordCard({ isFlipped, onFlip, word }) {
  return isFlipped ? <span>{word}</span> : <button onClick={onFlip}>?</button>
}

export default WordCard
