import React from 'react';
import styles from './Home.module.scss';

// console.log(`${sprites}#gnf-logo`);
const Home: React.FC = () => {
  return (
    <div className={styles.Home} data-testid="Home">
    <div className={`${styles.container} container`}>
        <div className={`${styles.content} content`}>
        <h1>Velkommen</h1>
        <p>
          Grønne Nabofællesskaber har til formål at skabe lokalt netværk for omstillingsinteresserede familier. Vi ønsker at hjælpe folk til at finde grønne ligesindede og få endnu flere bæredygtige aktiviteter ud i lokalsamfundet. Vi ved, at det er nemmere at leve bæredygtigt, når man er en del af et grønt fællesskab, og med Grønne Nabofællesskaber gør vi det muligt for alle at indgå i et grønt fællesskab 🌍
        </p><p>
          Det handler om at inspirere andre og blive inspireret af andre til gode grønne løsninger.
        </p>
      </div>
    </div>
  </div>
);
}

export default Home;
