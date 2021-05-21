import styles from '@styles/WindowControls.module.css'
import { useEffect } from 'react'

const WindowControls = ({ theme, setTheme }) => {
  const darkClick = () => {
    if (theme === 'dark') return
    setTheme('dark')
  }

  const lightClick = () => {
    if (theme === 'light') return
    setTheme('light')
  }

  useEffect(() => {
    const root = document.querySelector('#root')
    if (theme === 'light') {
      root.style.background = '#333'
    } else {
      root.style.background = '#fff'
    }
  }, [theme])

  return (
    <div className={styles['window-controls__container']}>
      <div className={styles[`window-controls__button-wrapper ${theme}`]}>
        <div
          className={
            styles[`window-controls__button ${theme === 'dark' && 'selected'} ${theme}`]
          }
          onClick={darkClick}
        >
          DARK UI
        </div>
        <div
          className={
            styles[
              `window-controls__button ${theme === 'light' && 'selected'} ${theme}`
            ]
          }
          onClick={lightClick}
        >
          LIGHT UI
        </div>
      </div>
    </div>
  )
}

export default WindowControls
