import Button from 'components/ui/Button/Button';
import React from 'react';
import styles from './CardGenerator.module.scss';
import kommunedata from '_data/kommuner.api.dataforsyningen.dk.json'
import { capitalize, compare, isValidHttpUrl } from '_helpers';
import Card from 'components/ui/Card/Card';

const CardGenerator: React.FC = () => {
  // let ids: { [id: string]: number } = {};
  // const grupper = gnfg.grupper.map((g) => {
  //   const navn = g.split('/ ')[1]
  //   const by = navn.split(' i ')[1] ? navn.split(' i ')[0] : navn;
  //   let kom = (navn.split(' i ')[1] || by);
  // // UNDTAGELSER
  //   kom = kom.localeCompare('kbh', undefined, { sensitivity: 'accent' }) === 0 || kom.localeCompare('København', undefined, { sensitivity: 'accent' }) === 0 ? 'Københavns' : kom
  //   kom = kom.localeCompare('Bornholm', undefined, { sensitivity: 'accent' }) === 0 ? 'Bornholms Regionskommune' : kom
  //   kom = kom.localeCompare('Faaborg', undefined, { sensitivity: 'accent' }) === 0 ? 'Faaborg-Midtfyn' : kom
  //   kom = kom.localeCompare('Vesthimmerland', undefined, { sensitivity: 'accent' }) === 0 ? 'Vesthimmerlands' : kom

  //   ids[kom] = ids[kom] + 1 || 1;
  //   return {
  //     id: `${kom}${ids[kom]}`,
  //     type: by === kom ? 'kommunegruppe' : 'bygruppe',
  //     navn: by,
  //     links: [
  //       g.replace(` ${navn}`, '')
  //     ],
  //     beskrivelse: `${by} Grønne Nabofællesskaber har til formål at skabe lokalt netværk for omstillingsinteresserede folk og familier. Vi ønsker at hjælpe folk til at finde grønne ligesindede i ${by} og få endnu flere bæredygtige aktiviteter ud i lokalsamfundet. Vi ved, at det er nemmere at leve bæredygtigt, når man er en del af et grønt fællesskab, og med Grønne Nabofællesskaber gør vi det muligt for alle at indgå i et grønt fællesskab 🌍 Det handler om at inspirere andre og blive inspireret af andre til gode grønne løsninger.`,
  //     kommune: `${kom} ${kom.localeCompare('Bornholms Regionskommune') === 0 ? '' : 'Kommune'}`,
  //     "img": ""
  //   }
  // })
  const defaultData: TGNFG & { active: boolean } = {
    id: '',
    type: '',
    navn: '',
    links: [],
    beskrivelse: '',
    kommune: '',
    active: false,
  }
  const [state, setState] = React.useState({
    name: '',
    url: '',
    kommune: 'København',
    error: { active: false, content: '' },
    result: defaultData,
  })

  function generate(event: Event) {
    event.preventDefault();
    console.log(state, compare(state.name, state.kommune))
    isValidHttpUrl(state.url.trim()) ?
      setState({
        ...state,
        result: {
          ...state.result,
          type: compare(state.name.trim(), state.kommune.trim()) ? 'kommunegruppe' : 'lokalgruppe',
          navn: state.name && state.name.trim() !== '' ? capitalize(state.name.trim()) : '__BLANK__',
          links: [state.url.trim()],
          kommune: capitalize(state.kommune.trim()),
          active: true,
        },
        error: {...state.error,
          content: '',
          active: false}
      })
      : setState({
          ...state,
          result: {...state.result, active: false},
          error: {content: 'URL er ikke gyldig', active: true}
        })

  }
  function handleInputChange(event: any): void {
    // event.preventDefault();
    const target = event.target;
    setState({
      ...state,
      [target.name]: target.value,
      error: {...state.error, content: '', active: false}
    })
  }
  return (
    <div className={styles.CardGenerator} data-testid="CardGenerator">
      <div className={`${styles.container} container`}>
        <div className={`${styles.content} content`}>
          <h1>Card Generator</h1>
          <form className={styles.input}>
            <ul>
              <li>
                <label>Navn: <input type="text" name="name" onChange={handleInputChange} placeholder="Gruppenavn" value={state.name} /></label>
              </li>
              <li>
                <label>Gruppe-URL: <input type="text" name="url" onChange={handleInputChange} placeholder="Facebook URL" value={state.url} /></label>
              </li>
              <li>
                <label>Kommune:
                  <select name="kommune" onChange={handleInputChange} value={state.kommune} >
                    {kommunedata.sort((a, b) =>
                      a.navn > b.navn ? 1 : -1
                    ).map((k, i) =>
                      <option key={i} value={k.navn}>{k.navn}</option>
                    )}
                  </select>
                </label>
              </li>
            </ul>

            {/* {JSON.stringify(kommunedata)} */}
            <Button label="Go" onClick={generate} />
          </form>
          <div className={styles.result}>
            {state.result.active && <Card data={state.result} />}
          </div>
          {state.error.active &&
            <div className={styles.error}>
              {state.error.content}
            </div>}
          {
            /**  */
            // <ul>
            // gnfg.grupper.map((g) => 
            //   <li><a target="_blank" rel="noreferrer" href={g.split(' ')[0]}>{g.replace(`${g.split(' ')[0]} `, '')}</a></li>
            //   )
            //   <li>{JSON.stringify(grupper)}</li>
            // </ul>
          }
        </div>
      </div>
    </div>
  )
}

export default CardGenerator;
