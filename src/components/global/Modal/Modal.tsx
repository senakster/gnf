import React, { Component } from 'react';
import { ActionType, useStateContext } from '_libs/_state';
import styles from './Modal.module.scss'
import Loading from '../Loading/Loading';
// import { ModalWrapper, ModalBoxSetup, ModalBg } from "./generalStyle";

const Modal: React.FC<any> = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => {
  const {dispatch} = useStateContext()
  const { modal } = useStateContext().state.state.ui
  function dismiss(){
    dispatch && dispatch(
      {
        type: ActionType.SET_MODAL,
      }
    )
  }

  function test() {
    const data = modal ? false : <Loading />;
    dispatch && dispatch(
      {
        type: ActionType.SET_MODAL,
        payload: data
      }
    )
  }
  React.useEffect(() => {
    if(modal) {
      document.body.style.overflow = 'hidden';
      // document.body.style.zIndex = '-1000';
    } else {
      document.body.style.overflow = 'auto';
      // document.body.style.zIndex = '0';
    }
  },[modal])
  return (
    <>
      <div className={`${styles.Modal} ${modal && styles.active}`}>
        <div className={`${styles.container}`}>
          <div className={styles.closeArea} onClick={dismiss}></div>
          <div className={`${styles.content}`}>
            {modal && modal}
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal


