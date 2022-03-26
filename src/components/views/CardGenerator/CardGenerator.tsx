import Button from 'components/ui/Button/Button';
import React from 'react';
import styles from './CardGenerator.module.scss';
import kommunedata from '_libs/_data/kommuner.api.dataforsyningen.dk.json'
import { capitalize, compare, isValidHttpUrl } from '_libs/_helpers';
import Card from 'components/ui/Card/Card';

const CardGenerator: React.FC = () => {

  const defaultData: TGNFG = {
    id: '',
    grouptype: '',
    name: '',
    _embedded: {
      grouplinks: [],
    },
    description: '',
    municipality: '',
    status: 'inactive',
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
          grouptype: compare(state.name.trim(), state.kommune.trim()) ? 'kommunegruppe' : 'lokalgruppe',
          name: state.name && state.name.trim() !== '' ? capitalize(state.name.trim()) : '__BLANK__',
          _embedded: {grouplinks: [{name: 'facebook', url: state.url.trim()},]},
          municipality: capitalize(state.kommune.trim()),
          status: 'active',
        },

        error: {...state.error,
          content: '',
          active: false}
      })
      : setState({
          ...state,
          result: {...state.result, status: 'active'},
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
            {state.result.status === 'active' && <Card data={{...state.result, variant: ''}} />}
          </div>
          {state.error.active &&
            <div className={styles.error}>
              {state.error.content}
             </div>}
        </div>
      </div>
    </div>
  )
}

export default CardGenerator;
