import CookieSettings from 'components/global/CookieSettings/CookieSettings';
import React from 'react';
import conf from '_libs/_config';
import SoMe from '../SoMe/SoMe';
import styles from './Footer.module.scss';

const Footer: React.FC<any> = ({ ...props }) => {
  const [state, setState] = React.useState({ active: false });

  React.useEffect(() => {
    function footerLeave(e: MouseEvent) {
      !!!(e.target as Element).closest(`.${styles.Footer}`) && setState({
        ...state,
        active: false,
      });
    }
    window.addEventListener('click', footerLeave)
    return () => { window.removeEventListener('click', footerLeave)}
  },[])


  function toggleActive(){
    setState({
      ...state,
      active: !state.active
    })
  }
  return (
    <div className={`${styles.Footer} ${styles[props.variant]} ${state.active ? styles.active : styles.inactive}`} data-testid="Footer">
      {props.variant === 'collapse' && <div className={styles.handle} onClick={toggleActive}></div>}

    <div className={styles.container}>
      {/* CONTENT */}
      <div className={styles.content}>
        {/* MAIN CONTENT */}
          <ul className={styles.stuff}>
            {/* KONTAKT  */}
            <li className={`${styles.kontakt}`}>
              <h2>Omstilling NU</h2>
              Dronningensgade 14<br />
              1420 København K<br />
              <a href="mailto:info@omstilling.nu">info@omstilling.nu</a><br />
              tlf: 71797100
            </li>
            {/* COOKIE SETTINGS  */}
            <li className={`${styles.cookieSettings}`}>
              <CookieSettings variant="modal" />
            </li>
          </ul>

          {/* META ELEMENTS */}
        <ul className={styles.meta}>
            {/* OMSTILLING.NU */}
            <li>
              <div className={styles.omstillingnu}>
                <a href="//omstilling.nu" rel="noreferrer" target="_blank">
                  <img className={styles.omstillingnuImg} src={`${process.env.PUBLIC_URL}/logo/ON-LOGO-01.svg`} alt="Omstilling.nu" />
                </a>
              </div>
            </li>
            {/* VERSION */}
            <li className={styles.version}>
              <span>version: {conf.app.version}</span>
              <br />
              <span>&copy; {new Date().getFullYear()}</span>
            </li>

            {/* SoMe */}
            <li className={styles.some}>
              <SoMe />
            </li>
        </ul>
      </div>
    </div>
  </div>
);
}

export default Footer;
