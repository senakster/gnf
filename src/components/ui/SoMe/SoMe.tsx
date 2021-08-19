import React from 'react';
import styles from './SoMe.module.scss';

export type SoMeProps = {
  variant: string;
  some: { 
    name: string;
    url: string;
    icon: string;  
  }[]
}
const SoMe: React.FC<SoMeProps> = (props) => {
  // console.log(props)
  return (
    <div className={`${styles.SoMe} ${styles[props.variant]}`} data-testid="SoMe">
      <ul>
      {/* {JSON.stringify(props)} */}
        {props.some.map((s: {name: string; url: string; icon: string}) => 
          <li key={s.name}>
          <a 
          href={`${s.url.replace(`%PUBLIC_URL%`,process.env.PUBLIC_URL)}`}
          rel="noreferrer"
          target="_blank"
          >
          <img 
          className={styles.someicon} 
          src={`${s.icon.replace(`%PUBLIC_URL%`, process.env.PUBLIC_URL)}`} 
          alt={s.name}/>
          </a>
          </li>
        )}
      </ul>
  </div>
);
}

export default SoMe;
