import React from 'react';
import styles from './Card.module.scss';
// import { navRoute } from '_helpers';

const Card: React.FC<any> = (props: { data: TGNFG & { variant: string, bgImg: string } }) => {
  console.log(props)
  const data = props.data;
  return (
    <div 
    // onClick={() => {navRoute(`group/${data.id}`)}}
    className={`${styles.Card}  ${styles[data.type]}  ${styles[data.variant]}`} 
    data-testid="Card">
      <div className={styles.container}>
        <div 
        className={styles.bg} 
          style={data.img && data.img.length > 0 ? { backgroundImage: `url(${data.img})` } : data.bgImg? { backgroundImage: `url(${data.bgImg})` } : {}}></div>
        <div className={styles.filter}></div>
        <h2 className={`${styles.title}`}>{data.navn}</h2>
        <ul className={styles.content}>
          <li>
            {/* <span className={`${styles.description}`}>{data.beskrivelse}</span> */}
          </li>
          {data.links.map((l, i) =>
            <li key={i}>
              <span className={`${styles.links}`}>
                <a href={l} target="_blank" rel="noreferrer">{l}</a>
              </span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Card;
