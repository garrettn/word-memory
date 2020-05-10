import React, { useState } from 'react'
import WordCard from '../WordCard'

const words = ['foo', 'bar', 'baz', 'qux']

function PlayGame() {
  const [flippedWords, updateFlippedWords] = useState([])
  return (
    <>
      <h1>Play Game!</h1>
      <>
        {words.map((word) => (
          <WordCard
            key={word}
            word={word}
            isFlipped={flippedWords.includes(word)}
            onFlip={() => updateFlippedWords([...flippedWords, word])}
          />
        ))}
      </>
    </>
  )
}

export default PlayGame
