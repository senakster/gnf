import React from 'react';
import styles from './Card.module.scss';
import { navRoute } from '_helpers';
import { logo, title } from '_data/images.json'
import QRCode from 'qrcode.react'
import { DefaultTheme, useTheme } from 'styled-components';
import { capitalize } from '_helpers';

const Card: React.FC<any> = (props: { data: TGNFG & { variant: string, bgImg: string } }) => {
  const data = props.data;
  const theme = useTheme() as DefaultTheme & { body: string, text: string }
  console.log(theme.body)
  return (
    <div 
    data-value={data.value}
    className={`${styles.Card}  ${styles[data.type]}  ${styles[data.variant]}`} 
    data-testid="Card"
    style={{order: data.type === 'lokalgruppe'? 1 : 0}}
    >
      <div className={styles.cardImg}>
        <img src={logo.replace("%PUBLIC_URL%",process.env.PUBLIC_URL)} alt="logo"/>
        <img src={title.replace("%PUBLIC_URL%", process.env.PUBLIC_URL)} alt="title" />
      </div>

      <div className={styles.container}>
        <div 
        className={styles.bg} 
          style={data.img && data.img.length > 0 ? { backgroundImage: `url(${data.img})` } : data.bgImg? { backgroundImage: `url(${data.bgImg})` } : {}}
        ></div>
        <div className={styles.filter}></div>
        {/* <h3 className={`${styles.title}`}>Grønne Nabofællesskaber</h3> */}
        <h2 className={`${styles.title} //link`} 
        // onClick={() => { navRoute(`/group/${data.id}`) }}
        >{capitalize(data.navn)}</h2>

        {/* GRUPPE TYPE */}
        {/* <h4 className={`${styles.title}`}>{capitalize(data.type)}</h4> */}

        <ul className={styles.content}>
          {/* <li>
            <span className={`${styles.description}`}>{data.beskrivelse}</span>
          </li> */}
          <li className={styles.qrcode}>
            <QRCode 
            value={data.links[0]} 
            size={160}
            bgColor={theme.body}
            fgColor={theme.text}
            level="L"
            // string ('L' 'M' 'Q' 'H')	'L'
            /></li>
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
