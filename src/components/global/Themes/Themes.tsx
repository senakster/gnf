import React from 'react';
import styles from './Themes.module.scss';
import { themes } from '_themes'
import ff from '_fonts'
import { capitalize } from '_helpers'
// import { ActionType, useStateContext } from '_state';

const Themes: React.FC<any> = ({ variant, theme, font, handlers }) => {
  const [cbCollapse, setCb] = React.useState(false);
  return (
    <div className={styles.Themes}>
      {variant !== 'minimal' && <h2>{`${capitalize(theme)} Theme`}</h2>}
      <select onChange={handlers.handleThemeChange}
        value={themes.find((t) => t.name === theme)?.id}>
        {themes.map((t) =>
          <option key={t.id} value={t.id}
            style={{
              color: t.theme.text,
              backgroundColor: t.theme.body,
            }}
          >
            {`${t.name[0].toLocaleUpperCase()}${t.name.slice(1)}`}
          </option>
        )}
      </select>
      <select onChange={handlers.handleFontChange}
        value={font}>
          {ff.map((f,i) => 
            <option key={i} value={f} style={{fontFamily: f}}>
               {f}
            </option>
          )}

      </select>
      {variant !== 'minimal' && <ColorBox cbCollapse={cbCollapse} setCb={setCb} />}
    </div>
  );
}

export default Themes;

const ColorBox: React.FC<any> = ({ cbCollapse, setCb }) => {
  return (
    < div className={`${styles.colorBox}`}>
      <h4 className={styles.title} onClick={() => { setCb(!cbCollapse) }}>color-box</h4>
      <div className={`${cbCollapse ? styles.collapsed : ''} ${styles.cbContainer}`}>
        <div className={`${styles.cb} ${styles.pl}`}></div>
        <div className={`${styles.cb} ${styles.sl}`}></div>
        <div className={`${styles.cb} ${styles.pd}`}></div>
        <div className={`${styles.cb} ${styles.sd}`}></div>
        <div className={`${styles.cb} ${styles.gp}`}></div>
        <div className={`${styles.cb} ${styles.gs}`}></div>
      </div>
    </div >
  )
}
