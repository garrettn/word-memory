import React, { useState } from 'react'
import styles from './ConfigureGame.module.css'

function ConfigureGame() {
  const [wordsText, setWordsText] = useState('one\ntwo\nthree\nfour')
  const words = wordsText.trim().split(/,?\s+/)
  const searchString = `?w=${words.join('&w=')}`
  const linkUrl = window.location.href + searchString
  return (
    <div className={styles.container}>
      <h1>Word Memory</h1>
      <label htmlFor="words" className={styles.label}>
        Create your list of words:
      </label>
      <textarea
        id="words"
        value={wordsText}
        onChange={(e) => setWordsText(e.target.value)}
        className={styles.textarea}
      />
      {wordsText.trim().length ? (
        <>
          <p>Then click on the link to play:</p>
          <p>
            <a href={linkUrl} className={styles.link}>
              {linkUrl}
            </a>
          </p>
        </>
      ) : null}
    </div>
  )
}

export default ConfigureGame
