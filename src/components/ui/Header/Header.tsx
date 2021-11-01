import React from 'react';
import styles from './Header.module.scss';

import { history, navRoute } from '_libs/_helpers'

import Navigation from '../Navigation/Navigation.lazy';
import SvgIcon from '../SvgIcon/SvgIcon';
import LanguageSelector from 'components/global/LanguageSelector/LanguageSelector';

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
    <div id="header" className={`${styles.Header} ${styles[props.variant]} ${state.collapse ? styles.collapse : ''}`} data-testid={`Headertest`} 
    // {...props}
    >
    <div 
    className={styles.bg} 
    style={props.backgroundImage ? {backgroundImage: `url(${props.backgroundImage})`} : {}}>
    </div>
    <div className={styles.filter}>
    </div>
    <div className={styles.content}>
        <LanguageSelector />
      {props.logo &&
          <div className={styles.logo} onClick={() => { navRoute('/') }}>
            {props.logo.map((src: {id: string, url: string;}, i: number) =>
              <div key={src.id} className={styles.icon}>
              <SvgIcon {...{id: src.id}} />
              </div>
            )}
          </div>}
      {props.title && <h1 className={`${styles.title} font-face-themed-title`}>{`${props.title}`}</h1>}
      {props.navigation && <Navigation history={history} />}
    </div>
    {props.variant !== 'embed' && <TopScroll /> }
  </div>
);
}

export default Header;

const TopScroll: React.FC = () => {
  const [state, setState ] = React.useState({
    active: false
  });
  React.useEffect(()=> {
    function checkScroll(){
      setState({
        active: window.scrollY !== 0 ? true : false,
      })
    }
    window.addEventListener('scroll',checkScroll)
    return () => { window.removeEventListener('scroll', checkScroll)}
  },[])
  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className={`${styles.topScroll} ${state.active && styles.active}`} aria-label="Scroll to Top" onClick={scrollToTop} />
  )
}