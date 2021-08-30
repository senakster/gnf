import React from 'react';
import { ActionType, useStateContext } from '_state';
import styles from './Messages.module.scss';


const Messages: React.FC = () => {
  const { dispatch } = useStateContext();
  const { messages, archive } = useStateContext().state.messages;
  const states = ['dormant','rolling','ending']
  const [state, setState] = React.useState(states[0])

  function popMessage() {
    // console.log('POP!', messages.length, messages)
    dispatch && dispatch({
      type: ActionType.POP_MESSAGE,
    })
  }
  React.useEffect(() => {
    const duration = 4000;
    const l = messages.length
    const interval = setInterval(popMessage, duration);
    l < 1 && clearInterval(interval);
    setState(states[l > 0 ? l === 1 ? 2 : 1 : 0])
    return () => {
      clearInterval(interval);
    }
  },[messages, dispatch])


  // const {state, dispatch} = useContext();
  return (
    <div className={`${styles.Messages} ${styles[state]}`}>
    <div className={styles.container}>
      <div className={styles.content}>
          <div className={styles.title}>
            {messages[0] && <span>{messages[0].title}</span>}
          </div>
          <div className={styles.body}>
            {messages[0] && <span>{messages[0].body}</span>}
          </div>
          <div className={styles.order}>
            {messages[0] && <span>{`message ${1 + archive.length} of ${messages.length + archive.length}`}</span>}
          </div>
          {/* <div className={styles.id}>
            {messages[0] && <span>{`id: ${messages[0].id}`}</span>}
          </div> */}
      </div>
    </div>
  </div>
);
}

export default Messages;
