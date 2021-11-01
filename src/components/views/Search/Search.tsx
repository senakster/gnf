import React from 'react';
import styles from './Search.module.scss';
import { useParams } from 'react-router-dom';
import Card from 'components/ui/Card/Card';
import Button from 'components/ui/Button/Button';
import { useStateContext } from '_libs/_state';
import Loading from 'components/global/Loading/Loading';
import { useTranslation } from 'react-i18next';

const Search: React.FC = () => {
  const params: { groupId?: string; } = useParams()
  const { data } = useStateContext().state.state;

  // React.useEffect(() => {
  //   console.log( data );
  // }, [data])
  return (
    <div className={styles.Search} data-testid="Search">
      <div className={`${styles.container} container`}>
        <div className={`${styles.content} content`}>
          {data.grupper.length > 0 ? <GroupList /> : <Loading />}
          {params.groupId && data.grupper.length > 0 &&
            <GroupDetails id={params.groupId} />
          }
        </div>
      </div>
    </div >

  );
}

export default Search;

const GroupList: React.FC = () => {
  const  {t} = useTranslation('search')
  // const {state, dispatch } = useStateContext()
  const { data } = useStateContext().state.state;
  const [filter, setFilter] = React.useState({
    municipality: '',
    group: '',
  });

  function onlyUnique(value: string, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  function scrollToId(id: string, block: "center" | "end" | "nearest" | "start" = "center") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: block });
  }


  function filterInput(e: any) {
    const { name, value } = e.target
    console.log(name, value, filter.municipality)
    setFilter({
      ...filter,
      [name]: name === 'municipality' && value === filter.municipality ? '' : value
    })
  }
  function resetFilter(e: any) {
    const { name } = e.target
    setFilter({
      ...filter,
      [name]: ''
    })
  }


  function kFilter(sub: string) {
    return !filter.municipality ? true : sub.toUpperCase().indexOf(filter.municipality.toUpperCase()) > -1
  }
  // function kgFilter(sub: string) {
  //   return !filter.municipality ? true : sub.toUpperCase().indexOf(filter.municipality.toUpperCase()) > -1
  // }
  function gFilter(sub: TGNFG) {
    return !filter.group ? filter.municipality ? true : false : sub.name.toUpperCase().indexOf(filter.group.toUpperCase()) > -1
  }
  function gkFilter(sub: TGNFG) {
    return !filter.group ? true : sub.name.toUpperCase().indexOf(filter.group.toUpperCase()) > -1
  }


  return (
    <>
      {/* <div id="kommuneSearch" className={styles.kommuneFilter}>
        <h1>Filtrer </h1>
        <ul>
          <li></li>
          <li><label>Grupper: </label></li>
          <li>{JSON.stringify(filter)}</li>
        </ul>
      </div> */}
      <h1>{t('title')}</h1>
      <div className={styles.searchResults}>
        <div className={styles.searchInputs}>
          <div><label>{t('groupSearch')}: </label><br />
            <input type='text' name="group" value={filter.group} placeholder='&#x1F50D;' onChange={filterInput} onClick={() => { scrollToId("kommuneSearch", "start") }} />
            <Button variant="singleCharClose" label="x" name="group" onClick={resetFilter} />
          </div>
          {/* <div>
            <label>{t('municipalitySearch')}: </label><br />
            <input type='text' name="municipality" value={filter.municipality} placeholder='&#x1F50D;' onChange={filterInput} onClick={() => { scrollToId("kommuneSearch", "start") }} />
            <Button label="x" name="municipality" onClick={resetFilter} />
          </div> */}


        </div>
        <label>{t('municipalitySearch')}: </label><br />
        <div className={`${styles.list} ${filter ? '' : styles.filtered}`}>
          {data.grupper && 
          [...data.grupper
            .filter(gkFilter)
            .map((g) => g.municipality)
            .filter(onlyUnique)
            .filter(kFilter)
            .filter((k) => k !== filter.municipality),
            ...data.grupper
            .map((g) => g.municipality)
            .filter((k) => k === filter.municipality)
            .filter(onlyUnique),
          ]
          .sort()
          .map((k) =>
              <Button key={k} 
              variant="secondary" 
              className={[`${filter.municipality.toUpperCase() === k.toUpperCase() ? 'active' : ''}`]} 
              label={k} 
              name="municipality" 
              value={k} 
              onClick={filterInput} />
            )
          }
        </div>
        <div className={styles.cardList}>
            {data.grupper && data.grupper
              .filter(gFilter)
              .map((g) => g.municipality)
              .filter(onlyUnique)
              .filter(kFilter)
              .sort()
              .map((k) =>
                <div key={k} className={styles.groupsByMunicipality}>
                  <h4><span>{t('w.municipality')}: </span> {k}</h4>
                  {data.grupper
                    .filter(gFilter)
                    .filter((g) => g.municipality === k)
                    .map((g) =>
                      <Card key={g.name} data={g} />
                    )
                  }
                  {/* <Button key={g.name} label={g.name} name="group" value={g.name} onClick={filterInput} />
                    <Card key={g.name} data={g} /> */}
                </div>
              )}
        </div>
      </div>
    </>
  )
}

const GroupDetails: React.FC<{ id: string }> = ({ id }) => {
  const { data } = useStateContext().state.state;
  const g: TGNFG | undefined = data.grupper.find((g) => g.groupid === id)
  return (
    <div className={styles.details}>
      {g?.municipality &&
        <>
          <div className={styles.title}><h1>{g.municipality}</h1></div>
          <div id={`cards`} className={styles.cards}>
            <Card data={{ ...g }} />
          </div>
        </>
      }
    </div>
  )
}