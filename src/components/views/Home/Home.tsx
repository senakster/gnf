// import Loading from 'components/global/Loading/Loading';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styles from './Home.module.scss';
import config from '_libs/_config/config.json'
const Home: React.FC = () => {
  const { t } = useTranslation('home');
  return (
    <div className={styles.Home} data-testid="Home">
    <div className={`${styles.container} container`}>
        <div className={`${styles.content} content`}>
          <section>
            <h1>{t('h1')}</h1>
            <p>{t('p1')}</p>
            <p>{t('p2')}</p>
            <p>{t('p3')}</p>
            <p>{t('join')}</p>
            <p>{t('contact')}:</p>
            <a href={`mailto:${config.contact.email}`}>info@omstilling.nu</a><br />
            {t('w.or')}<br />
            <a target="_blank" rel="noreferrer" href={`${config.contact.facebook}`}>www.facebook.com/groennenabofaellesskaber</a><br />
          </section>
          <section>
          <h1>{t('miyawaki.h1')}</h1>
          <p>{t('miyawaki.p1')}</p>
          {/* <p>{t('miyawaki.p2')}</p>
          <p>{t('miyawaki.3')}</p> */}
            <p>{t('contact')}:</p>
            <a href={`mailto:${config.contact.email}`}>info@omstilling.nu</a><br />
            {t('w.or')}<br />
          <a target="_blank" rel="noreferrer" href={`${config.contact.miyawaki}`}>www.facebook.com/miyawakiskovedk</a><br />
          </section>
      </div>
    </div>
  </div>
);
}

export default Home;