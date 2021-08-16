import React from 'react';
// import { navRoute } from '_helpers/fn';
import SoMe from '../SoMe/SoMe';
import styles from './Footer.module.scss';

const Footer: React.FC<any> = ({ ...props }) => (
  <div className={styles.Footer} data-testid="Footer">
    <div className={styles.handle}></div>

    <div className={styles.container}>
      {/* TITLE */}
      {/* <h2 className={`pointer ${styles.title}`} onClick={() => { navRoute('/') }}>Grønne Nabofællesskaber</h2> */}

      {/* CONTENT */}
      <div className={styles.content}>
        <ul>
            <li>
              {/* Samarbejder */}
            </li>
        </ul>
      </div>

    </div>

    {/* SCIAL MEDIA */}
    {props.some && <SoMe some={[...props.some]} />}
    {/* OMSTILLING.NU */}
    <div className={styles.omstillingnu}>
      <ul>
        <li>
          <a href="//omstilling.nu" rel="noreferrer" target="_blank">
            <img className={styles.omstillingnuImg} src={`${process.env.PUBLIC_URL}/logo/ON-LOGO-01.svg`} alt="Omstilling.nu" />
          </a>
        </li>
      </ul>
    </div>
  </div>
);

export default Footer;
