import React, { useState } from 'react'

function ConfigureGame() {
  const [wordsText, setWordsText] = useState('one\ntwo\nthree\nfour')
  const words = wordsText.trim().split(/,?\s+/)
  const searchString = `?w=${words.join('&w=')}`
  const linkUrl = window.location.href + searchString
  return (
    <>
      <h1>Word Memory</h1>
      <label htmlFor="words">Create your list of words:</label>
      <textarea
        id="words"
        value={wordsText}
        onChange={(e) => setWordsText(e.target.value)}
      />
      {wordsText.trim().length ? (
        <>
          <p>Then click on the link to play:</p>
          <p>
            <a href={linkUrl}>{linkUrl}</a>
          </p>
        </>
      ) : null}
    </>
  )
}

export default ConfigureGame
