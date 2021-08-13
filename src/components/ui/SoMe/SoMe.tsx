import React from 'react';
import styles from './SoMe.module.scss';

export type SoMeProps = {
  SoMe: { 
    name: string;
    url: string;
    icon: string;  
  }[]
}
const SoMe: React.FC<SoMeProps> = (props) => (
  <div className={styles.SoMe} data-testid="SoMe">
      <ul>
      {/* {JSON.stringify(props)} */}
        {props.SoMe.map((s: {name: string; url: string; icon: string}) => 
          <li>
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

export default SoMe;
