import React from 'react';
import styles from './Home.module.scss';
import gnfg from '_data/grupper.json'

const Home = () => {
  let ids: {[id: string]: number} = {};
  const grupper = gnfg.grupper.map((g) => {
    const navn = g.split('/ ')[1]
    const by = navn.split(' i ')[1]? navn.split(' i ')[0] : navn;
    let kom = (navn.split(' i ')[1] || by);
    kom = kom.localeCompare('kbh', undefined, {sensitivity: 'accent'}) === 0 || kom.localeCompare('København') === 0 ? 'Københavns' : kom
    kom = kom.localeCompare('Bornholm') === 0 ? 'Bornholms Regionskommune' : kom
    ids[kom] = ids[kom]+1 || 1;
    return {
      id: `${kom}${ids[kom]}`,
      type: by === kom ? 'kommunegruppe' : 'bygruppe',
      navn: by,
      links: [
        g.replace(` ${navn}`, '')
      ],
      beskrivelse: `${by} Grønne Nabofællesskaber har til formål at skabe lokalt netværk for omstillingsinteresserede folk og familier. Vi ønsker at hjælpe folk til at finde grønne ligesindede i ${by} og få endnu flere bæredygtige aktiviteter ud i lokalsamfundet. Vi ved, at det er nemmere at leve bæredygtigt, når man er en del af et grønt fællesskab, og med Grønne Nabofællesskaber gør vi det muligt for alle at indgå i et grønt fællesskab 🌍 Det handler om at inspirere andre og blive inspireret af andre til gode grønne løsninger.`,
      kommune: `${kom} ${kom.localeCompare('Bornholms Regionskommune') === 0? '' : 'Kommune'}`,
      "img": ""
    }
  })
  return (
    <div className={styles.Home} data-testid="Home">
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Velkommen</h1>
        <p>
          Grønne Nabofællesskaber har til formål at skabe lokalt netværk for omstillingsinteresserede familier. Vi ønsker at hjælpe folk til at finde grønne ligesindede og få endnu flere bæredygtige aktiviteter ud i lokalsamfundet. Vi ved, at det er nemmere at leve bæredygtigt, når man er en del af et grønt fællesskab, og med Grønne Nabofællesskaber gør vi det muligt for alle at indgå i et grønt fællesskab 🌍
        </p><p>
          Det handler om at inspirere andre og blive inspireret af andre til gode grønne løsninger.
        </p>
        <ul>{
        // gnfg.grupper.map((g) => 
        //   <li><a target="_blank" rel="noreferrer" href={g.split(' ')[0]}>{g.replace(`${g.split(' ')[0]} `, '')}</a></li>
        // )
        // <li>{JSON.stringify(grupper)}</li>
        }</ul>
      </div>
    </div>
  </div>
);
}

export default Home;
