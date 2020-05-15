import { useEffect } from 'react'

function Main({ children, className }) {
  useEffect(() => {
    const mainEl = document.querySelector('main')
    mainEl.classList.add(className)

    return () => mainEl.classList.remove(className)
  }, [className])

  return children
}

export default Main
