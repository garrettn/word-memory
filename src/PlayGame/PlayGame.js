import React from 'react'
import WordCard from '../WordCard'

const words = ['foo', 'bar', 'baz', 'qux']

function PlayGame() {
  return (
    <>
      <h1>Play Game!</h1>
      <>
        {words.map((word) => (
          <WordCard key={word} word={word} />
        ))}
      </>
    </>
  )
}

export default PlayGame
