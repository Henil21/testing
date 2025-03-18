import React from 'react'
import styles from '../../chatbox/chatbox.module.css'
function ChatOptionButton({text}) {
  return (
    <>
     <button className={styles.inputChatbutton}>{text}</button>
    </>
  )
}

export default ChatOptionButton
