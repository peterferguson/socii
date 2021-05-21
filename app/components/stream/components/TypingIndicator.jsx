import styles from '@styles/TypingIndicator.module.css'
import React, { useContext } from 'react'
import { ChannelContext } from 'stream-chat-react'

const TypingIndicator = () => {
  const { client, typing } = useContext(ChannelContext)

  if (!client || !typing) return null

  const users = Object.values(typing)
    .filter(({ user }) => user?.id !== client.user?.id)
    .map(({ user }) => user.name || user.id)

  let text = ''

  if (users.length === 1) {
    text = `${users[0]} is typing`
  } else if (users.length === 2) {
    text = `${users[0]} and ${users[1]} are typing`
  } else if (users.length > 2) {
    text = `${users[0]} and ${users.length - 1} more are typing`
  }

  return (
    <div className={styles['messaging__typing-indicator']}>
      {text && (
        <div className={styles['dots']}>
          <span className={styles['dot']} />
          <span className={styles['dot']} />
          <span className={styles['dot']} />
        </div>
      )}
      <div>{text}</div>
    </div>
  )
}

export default TypingIndicator
