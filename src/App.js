import React from 'react'
import ConfigureGame from './ConfigureGame'
import PlayGame from './PlayGame'

function App() {
  const params = new URLSearchParams(window.location.search.slice(1))
  const words = params.getAll('w')

  if (words.length) {
    return <PlayGame words={words} />
  }

  return <ConfigureGame />
}

export default App
