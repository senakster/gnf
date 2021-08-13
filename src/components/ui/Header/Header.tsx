import React from 'react';
import styles from './Header.module.scss';

import { history, navRoute } from '_helpers'

import Navigation from '../Navigation/Navigation';
import SoMe from '../SoMe/SoMe';




const Header: React.FC<any> = (props) => {
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  })

  const [state, setState] = React.useState(
    {
      scrollY: 0,
      up: false,
      collapse: false,
    }
  )
  function handleScroll(e: Event) {
    // console.log(state.scrollY > window.scrollY)
    // console.log(state.scrollY === window.scrollY)

    setState(
      { ...state,
        scrollY: window.scrollY,
        up: state.scrollY > window.scrollY,
        collapse: true
      }
    )
    // console.log('scroll', e)
  }
  return (
    <div className={`${styles.Header} ${styles[props.variant]} ${state.collapse ? styles.collapse : ''}`} data-testid={`Headertest`} 
    // {...props}
    >
    <div 
    className={styles.bg} 
    style={props.backgroundImage ? {backgroundImage: `url(${props.backgroundImage})`} : {}}>
    </div>
    <div className={styles.filter}>
    </div>
    <div className={styles.content}>
        {props.logo &&
          <div className={styles.logo} onClick={() => { navRoute('/') }}>
            {props.logo.map((l: string, i: number) =>
              <img key={i} className={`${props.logo}`} src={props.logo[i]} alt={`logo`} />
            )}
          </div>}
      {props.title && <h1 className={`${styles.title} font-face-themed-title`}>{`${props.title}`}</h1>}
      {props.navigation && <Navigation history={history} />}
      {<SoMe {...props.some}/>}
    </div>
  </div>
);
}

export default Header;
