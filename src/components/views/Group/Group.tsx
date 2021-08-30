import React from 'react';
import styles from './Group.module.scss';
import { useParams } from 'react-router-dom';
import Card from 'components/ui/Card/Card';
import Button from 'components/ui/Button/Button';
import QRCode from 'qrcode.react'
import { useStateContext } from '_state';
import Loading from 'components/global/Loading/Loading';

const Group: React.FC = () => {
  const params: { groupId?: string; } = useParams()
  const { data } = useStateContext().state.state;

  const [ kommune, setKommune ] = React.useState((null) as string | null);

  return (
    <div className={styles.Group} data-testid="Group">
      <div className={`${styles.container} container`}>
        <div className={`${styles.content} content`}>
          {data.grupper.length > 0 ? <GroupList {...{ kommune, setKommune }} /> : <Loading />}
          {params.groupId && data.grupper.length > 0 && !kommune &&
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
  // const {state, dispatch } = useStateContext()
  const { data } = useStateContext().state.state;
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
        <h1>Søg Kommune</h1>
        <input type='text' placeholder='&#x1F50D;' onChange={filtrerKommuner} onClick={() => { scrollToId("kommuneSearch", "start")}}/>
      </div>
      
      <div className={`${styles.list} ${filter ? '' : styles.filtered}`}>
        {data.grupper && data.grupper.map((g) => g.kommune)
        .filter(onlyUnique)
        .filter(kFilter)
        .sort()
          .map((k) => <Button className={kommune === k ? 'active' : ''} key={k} label={k} value={k} onClick={kommuneSet} />
        )
        }
      </div>
      {kommune && <div className={styles.title}><h1>{kommune}</h1></div>}

      <div id={`cards`} className={styles.cards}>
        {kommune && data.grupper
          .filter((g) => g.kommune === kommune)
          .sort()
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

const GroupDetails: React.FC<{id: string}> = ({ id }) => {
  const { data } = useStateContext().state.state;
  const g: TGNFG | undefined = data.grupper.find((g) => g.id === id)
  return (
    <div className={styles.details}>
      {g?.kommune && 
      <>
      <div className={styles.title}><h1>{g.kommune}</h1></div>
      <div id={`cards`} className={styles.cards}>
        <Card data={{ ...g }} />
      </div>
      </>
      }
    </div>
  )

  // const theme = useTheme() as DefaultTheme & {
  //   text: string;
  //   body: string;
  // };
  // const [state, setState] = React.useState({ qrsize: window.screen.width > 1024 ? 360 : window.screen.width < 266 ? window.screen.width -10 : 256 })
  // React.useEffect(() => {
  //   window.addEventListener('resize', () => { setState({ ...state, qrsize: window.screen.width > 1000 ? 360 : 256 })})
  // return () => { 
  //   window.removeEventListener('resize', () => { setState({ ...state, qrsize: window.screen.width > 1000 ? 360 : 256 })})
  // }
  // },[])
  // return (
  //   <div className={styles.details}>
  //     <div className={`${styles.detailsContainer}`}>
  //     {/* <h2>Grønne Nabofællesskaber</h2> */}
  //     <div className={styles.logo}>
  //     <img className={styles.logo} src={logo.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)} alt="Grønne Nabofællesskaber" />
  //     <img className={styles.logoTitle} src={title.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)} alt="Grønne Nabofællesskaber" />
  //     </div>

  //     <h1 className={styles.detailTitle}>{g?.navn}</h1>
  //     <Button className={styles.closeBtn} label="x" value="/group" onClick={nav} />

  //     <div className={`${styles.detailsContent}`}>
  //       {g?.links && g.links?.map((l: string) =>
  //         <div key={l}>
  //         <QRCode value={`${g?.links[0]}`} 
  //         fgColor={theme.text || 'black'}
  //         bgColor={theme.body || 'white'}
  //         size={state.qrsize}
  //         />
  //         <p ><a href={l} target="_blank" rel="noreferrer">{l}</a></p>
  //         </div>
  //         )}
  //       <p>{g?.beskrivelse}</p>
  //     </div>
  //     </div>

  //   </div>
  // )
}