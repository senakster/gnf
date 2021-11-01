import Button from 'components/ui/Button/Button'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ActionType, useStateContext } from '_libs/_state'
import { TMiyawakiInfo } from './Miyawaki'
// import styles from '../LeafletCompMiyawaki.module.scss'
import styles from './PopupStyle.module.scss'

const PopContent: React.FC<any> = ({ data, handleClick, active }) => {
    const { t } = useTranslation()
    const {dispatch} = useStateContext()
    const [ui, setUI] = React.useState({
        figure: false as TMiyawakiInfo | false,
    });
    function setModalFigure(data: TMiyawakiInfo | false) {
        // setUI({
        //     ...ui,
        //     figure: data
        // })
        dispatch && dispatch({
            type: ActionType.SET_MODAL,
            payload: <ModalFigure i={data}/>
        })
    }
    return (
        <div className={styles.MiyawakiPopup}>
                <h1 className={styles.name}>{t(data.name, data.name)}</h1>
                <span className={styles.geoLocation}>geolokation: {data.LatLng.join(', ')}</span>
                <div className={styles.listContent}>
                    <div className={styles.imgContainer}>
                        {data.info.filter((i: TMiyawakiInfo) => i.type === 'img').map((i: TMiyawakiInfo, indx: number) =>
                            <Figure key={indx} {...{ i, onClick:() => {setModalFigure(i)} }} />
                            // <Image key={indx} {...{i}} />
                        )}
                    </div>
                    {data.info.filter((i: TMiyawakiInfo) => i.type === 'text').map((i: TMiyawakiInfo, indx: number) =>
                        <div key={indx}>
                            {i.description !== '' && <h3>{i.description}</h3>}
                            <p>{i.content}</p>
                        </div>
                    )}
                    {data.data.length > 0 &&
                        <>
                            <h4>data</h4>
                            <ul>
                                {data.data.map((d: any, i: number) =>
                                    <li key={i}>
                                        <span>{d.name}: </span><span>{d.value}</span>
                                    </li>
                                )}
                            </ul>
                            {data.info.filter((i: TMiyawakiInfo) => i.type === 'link').map((i: TMiyawakiInfo, indx: number) =>
                                <a key={indx} href={i.content} target="_blank" rel="noreferrer">{i.description}</a>
                            )}
                        </>
                    }
                </div>
            </div>

    )
}

export default PopContent

// const Image: React.FC<any> = ({i}) => {
//     const [active, setActive] = React.useState(false)
//     function toggleModal(){
//         setActive(!active)
//     }
//     return (
//         <div className={`${styles.img}`}>
//         <img
//         src={i.content} 
//         alt={i.description} 
//         // title={i.description}
//         onClick={toggleModal}/><br/>
//         <span>{i.description}</span>
//         <div className={`${styles.modalImg} ${active ? styles.active : styles.inactive}`}>
//         <img
//         // className={`${styles.modalImg} ${active ? styles.active : styles.inactive}`}
//         src={i.content}
//         alt={i.description}
//         title={i.description}
//         onClick={toggleModal} />
//         <span className={styles.modalDescription}>{i.description}</span>
//         </div>
//         </div>
//     )
// }

const Figure: React.FC<any> = ({ i, onClick }) => {
    return (
        <figure className={`${styles.img} ${styles.Figure}`}>
            <img
                src={i.content}
                alt={i.description}
                // title={i.description}
                onClick={onClick}
                /><br />
            <figcaption>{i.description}</figcaption>
        </figure>
    )
}
const ModalFigure: React.FC<any> = ({ i, onClick }) => {
    return (
        <figure className={`${styles.img} ${styles.ModalFigure}`}>
            <img
                src={i.content}
                alt={i.description}
                // title={i.description}
                onClick={onClick}
            /><br />
            <figcaption>{i.description}</figcaption>
        </figure>
    )
}