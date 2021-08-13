import React from 'react';
import styles from './Group.module.scss';
import GNFGrupper from '_data/GNF-Grupper-new.json'
import { useParams } from 'react-router-dom';

import { nav } from '_helpers/fn';
import Card from 'components/ui/Card/Card';
import Button from 'components/ui/Button/Button';
import { logo as bgImg } from '_data/images.json'

const Group: React.FC = () => {
  const params: { groupId?: string; } = useParams()

  const [kommune, setKommune] = React.useState((null) as string | null);

  return (
    <div className={styles.Group} data-testid="Group">
      <div className={styles.container}>
        <div className={styles.content}>          
          <GroupList {...{ kommune, setKommune }} />
          {/* <GroupDetails id={params.groupId} /> */}
          {params.groupId && !kommune &&
            <GroupDetails id={params.groupId} />
          }
        </div>
      </div>
    </div >

  );
}

export default Group;

type TListProps = {
  kommune: string | null;
  setKommune: (arg: string) => void;
}
const GroupList: React.FC<TListProps> = ({kommune, setKommune}) => {
  const [filter, setFilter] = React.useState(null as string | null);

  function onlyUnique(value: string, index: number, self: any) {
    return self.indexOf(value) === index;
  }

  function scrollToId(id: string, block: "center" | "end" | "nearest" | "start" = "center") {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: block});
  }
  function kommuneSet(event: any) {
    const target = event.target;
    setKommune(target.value)
    scrollToId('cards');
  }

  function filtrerKommuner(event: any) {
    setFilter(event.target.value)
  }

  function kFilter(sub: string){
    return !filter ? false : sub.toUpperCase().indexOf(filter.toUpperCase()) > -1
  }
  return (
    <>
      <div id="kommuneSearch" className={styles.kommuneFilter}>
        <input type='text' placeholder='Søg Kommune' onChange={filtrerKommuner} onClick={() => { scrollToId("kommuneSearch", "start")}}/>
        <i className="fa fa-search"></i>
      </div>
      
      <div className={`${styles.list} ${filter ? '' : styles.filtered}`}>
        {GNFGrupper && GNFGrupper.grupper.map((g) => g.kommune)
        .filter(onlyUnique)
        .filter(kFilter)
        .sort()
          .map((k) => <Button className={kommune === k ? 'active' : ''} key={k} label={k} value={k} onClick={kommuneSet} />
        )
        }
      </div>
      {kommune && <div className={styles.title}><h1>{kommune}</h1></div>}

      <div id={`cards`} className={styles.cards}>
        {kommune && GNFGrupper.grupper
          .filter((g) => g.kommune === kommune)
          .map((g, i) => {
            return <Card key={i} data={{ 
              ...g, 
              onClick: kommuneSet,
              // bgImg: bgImg.replace('%PUBLIC_URL%',process.env.PUBLIC_URL) 
            }} />
          })
        }
      </div>

    </>
  )
}

const GroupDetails: React.FC<any> = ({ id }) => {
  const g: TGNFG | undefined = GNFGrupper.grupper.find((g) => g.id === id)

  return (
    <div className={styles.details}>
      <h2>Grønne Nabofællesskaber</h2>
      <h1 className={styles.detailTitle}>{g?.navn}</h1>
      <Button className={styles.closeBtn} label="x" value="/group" onClick={nav} />
      <div className={styles.detailContent}>
        {g?.links && g.links?.map((l: string) =>
          <p key={l}><a href={l} target="_blank" rel="noreferrer">{l}</a></p>
        )}
        <p>{g?.beskrivelse}</p>
      </div>

    </div>
  )
}