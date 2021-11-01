import React from 'react';
import Button from '../Button/Button';
import styles from './SoMe.module.scss';
import someData from '_libs/_data/some.json'
export type SoMeProps = {
  variant?: string;
  some?: { 
    name: string;
    url: string;
    icon: string;  
  }[]
}
const SoMe: React.FC<SoMeProps> = (props) => {
  const [state, setState] = React.useState( {some: {active: false} } )
  const data  = props.some || someData.some;
  function toggleSome(){
    setState({
      ...state,
      some: {...state.some,
        active: !state.some.active
      }
    })
  }
  return (
    <div className={`${styles.SoMe} ${props.variant && styles[props.variant]} ${state.some.active && styles.active}`} data-testid="SoMe"
      onClick={toggleSome}
      title="Social Media"
    >
      <ul 
      className={`${styles.iconList}`} 
      >
        {data.map((s: {name: string; url: string; icon: string}, i: number) => 
          <li key={s.name} style={{'--n': i } as React.CSSProperties}>
          <a 
          href={`${s.url.replace(`%PUBLIC_URL%`,process.env.PUBLIC_URL)}`}
          rel="noreferrer"
          target="_blank"
          >
          <img 
          className={styles.someicon} 
          src={`${s.icon.replace(`%PUBLIC_URL%`, process.env.PUBLIC_URL)}`} 
          alt={s.name}
          />
          </a>
          </li>
        )}
      </ul>
  </div>
);
}

export default SoMe;