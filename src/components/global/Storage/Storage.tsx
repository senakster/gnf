import React from 'react';
import styles from './Storage.module.scss'
import { Action, ActionType, useStateContext } from '_libs/_state';
import { Context as StateContext } from '_libs/_state/reducers/stateReducer';
import { Context as MessageContext } from '_libs/_state/reducers/messageReducer';
import { Context as UserContext } from '_libs/_state/reducers/userReducer';
// import { Dispatcher } from '../ErrorBoundary/ErrorBoundary';

const Storage: React.FC<any> = ({variant}) => {
  const { state, dispatch } = useStateContext();
  const [ lstate, setLstate ] = React.useState(null);
  /**
   * Load State in const initialState in reducer
   */
  // React.useEffect(() => {
  // loadState('events')
  // console.log(events, ls)
  // }, [])

  React.useEffect(() => {
    // saveState('state', state)
    // Disable lint - controlling rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [])

  function testMessages(title = 'Message: ', message = 'body') {
    dispatch && dispatch({
      type: ActionType.NEW_MESSAGE,
      payload: {
        title: title,
        body: message,
      }
    })

  }
  function logState(){
    console.log('State: ', state.state)
    console.log('Messages: ', state.messages)
    console.log('User: ', state.user)
  }

  const deleteItem = (e: any) => {
    localStorage.removeItem(e.target.name);
    // dispatch && dispatch({
    //   type: ActionType.
    // })
  }

  const mockAction: Action = {
    type: ActionType.NEW_MESSAGE,
    payload: {
      title: 'TEST MESSAGE',
      body: 'Dispatcher Component TEST'
    }
  }
    return (
      variant === 'test' ? 
      <div className={styles.Storage}>
        <button onClick={() => {testMessages()}}>test message</button>
        <button onClick={logState}>log state</button>
        {/* <Dispatcher {...state} /> */}
      </div> 
      : null

  );
}

export default Storage;


export const clearStorage = () => {
  localStorage.clear();
}
// export const deleteItem = (e: any) => {
//   localStorage.removeItem(e.target.name);
// }

export function loadState (cookieName: string): undefined | StateContext & MessageContext & UserContext {
  console.log('Load State: ' + cookieName)
  return undefined;
  // try {
  //   const serializedState = localStorage.getItem(cookieName);
  //   if (serializedState === null) {
  //     return undefined;
  //   }
  //   return JSON.parse(serializedState);
  // } catch (err) {
  //   return undefined;
  // }
};

export const saveState = (cookieName: string, state: any) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(cookieName, serializedState);
  } catch {
    // ignore write errors
  }
};


