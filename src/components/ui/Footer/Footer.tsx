import React from 'react';
// import { navRoute } from '_helpers/fn';
import SoMe from '../SoMe/SoMe';
import styles from './Footer.module.scss';

const Footer: React.FC<any> = ({ ...props }) => (
  <div className={`${styles.Footer} ${styles[props.variant]}`} data-testid="Footer">
    {props.collapse === 'collapse' && <div className={styles.handle}></div>}

    <div className={styles.container}>
      {/* TITLE */}
      {/* <h2 className={`pointer ${styles.title}`} onClick={() => { navRoute('/') }}>Grønne Nabofællesskaber</h2> */}

      {/* CONTENT */}
      <div className={styles.content}>
        {/* <ul className={styles.colab}>
            <li>
            </li>
        </ul> */}
        {/* <ul className={styles.meta}>
            <li>
            </li>
        </ul> */}
      </div>

    </div>

    {/* SCIAL MEDIA */}
    {props.some && <SoMe variant={'fixed'} some={[...props.some]} />}

    {/* OMSTILLING.NU */}
    {/* <div className={styles.omstillingnu}>
      <ul>
        <li>
          <a href="//omstilling.nu" rel="noreferrer" target="_blank">
            <img className={styles.omstillingnuImg} src={`${process.env.PUBLIC_URL}/logo/ON-LOGO-01.svg`} alt="Omstilling.nu" />
          </a>
        </li>
      </ul>
    </div> */}
  </div>
);

export default Footer;
