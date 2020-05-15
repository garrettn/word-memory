import React from 'react'

function ConfigureGame() {
  return (
    <>
      <h1>Add some words to the URL to play.</h1>
      <p>For example:</p>
      <p>
        <a href={`${window.location.href}?w=one&w=two&w=three&w=four`}>
          {window.location.href}?w=one&w=two&w=three&w=four
        </a>
      </p>
    </>
  )
}

export default ConfigureGame
