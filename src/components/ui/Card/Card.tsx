import React from 'react';
import styles from './Card.module.scss';
import { logo, title } from '_libs/_media/img/images.json'
import QRCode from 'qrcode.react'
import { DefaultTheme, useTheme } from 'styled-components';
import { capitalize } from '_libs/_helpers';
import SvgIcon from '../SvgIcon/SvgIcon';


export const blankName = '__BLANK__';

export type Props = { data: TGNFG & { variant: string, bgImg?: string } }

const Card: React.FC<Props> = ({data}) => {
  const theme = useTheme() as DefaultTheme & { body: string, text: string }
  const fbLink: string = data._embedded?.grouplinks.find((l: TLink) => l.name === 'facebook')?.url || data._embedded?.grouplinks[0]?.url || ''
  return (
    <div
      className={`${styles.Card}  ${styles[data.grouptype]}  ${styles[data.variant]}`}
      data-testid="Card"
      style={{ order: data.grouptype === 'lokalgruppe' ? 1 : 0 }}
    >
      <div className={styles.cardImg}>
        <div className={styles.icon}>
          <SvgIcon {...{id: logo.id}} />
        </div>
        <div className={styles.icon}>
          <SvgIcon {...{ id: title.id }} />
        </div>
      </div>

      <div className={styles.container}>
        <div
          className={styles.bg}
          // style={data.img && data.img.length > 0 ? { backgroundImage: `url(${data.img})` } : data.bgImg ? { backgroundImage: `url(${data.bgImg})` } : {}}
        ></div>
        <div className={styles.filter}></div>
        {/* <h3 className={`${styles.title}`}>Grønne Nabofællesskaber</h3> */}
        <h2 className={`${styles.title} ${data.name=== blankName && styles.invisible} //link`}
        // onClick={() => { navRoute(`/group/${data.id}`) }}
        >{data.name}</h2>

        {/* GRUPPE TYPE */}
        <span className={`${styles.title}`}>{capitalize(data.grouptype)}</span>

        <ul className={styles.content}>
          {/* <li>
            <span className={`${styles.description}`}>{data.beskrivelse}</span>
          </li> */}
          <li className={styles.qrcode}>
              <a href={fbLink} target="_blank" rel="noreferrer">
                <QRCode
                  value={fbLink}
                  size={160}
                  bgColor={theme.body}
                  fgColor={theme.text}
                  level="L"
                // string ('L' 'M' 'Q' 'H')	'L'
                />
              </a>
          </li>
            <li>
              <span className={`${styles.links}`}>
                <a href={fbLink} target="_blank" rel="noreferrer">{fbLink}</a>
              </span>
            </li>
        </ul>
      </div>
    </div>
  );
}

export default Card;
