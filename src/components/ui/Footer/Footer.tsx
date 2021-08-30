import React from 'react';
import conf from '_config';
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
    <div className={`${styles.Footer} ${styles[props.variant]} ${state.active && styles.active}`} data-testid="Footer">
      {props.variant === 'collapse' && <div className={styles.handle} onClick={toggleActive}></div>}

    <div className={styles.container}>
      {/* CONTENT */}
      <div className={styles.content}>
        {/* MAIN CONTENT */}
          <ul className={styles.stuff}>
            {/* KONTAKT  */}
            <li className={`${styles.kontakt}`}>
              <span className={`${styles.kontaktTitle} themed-title`}>Omstilling NU</span><br />
              Dronningensgade 14<br />
              1420 København K<br />
              <a href="mailto:info@omstilling.nu">info@omstilling.nu</a>
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
