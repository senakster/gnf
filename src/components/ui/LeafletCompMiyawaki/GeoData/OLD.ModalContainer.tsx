import Button from 'components/ui/Button/Button'
import SvgIcon from 'components/ui/SvgIcon/SvgIcon'
import { logo } from '_libs/_media/img/images.json'
import config from '_libs/_config/config.json'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ModalContainer.module.scss'
import { useMap } from 'react-leaflet'
const ModalContainer: React.FC<any> = ({data, setModalContent}) => {
    const { t } = useTranslation('map')

    React.useEffect(() => {
        data ? lockMap() : unlockMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])
    const map = useMap();
    function lockMap() {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        // logMessage('device: ', navigator.userAgent )
        if (!/iP(ad|hone|od)/.test(navigator.userAgent)) {
            Object.assign(document.body.style, { overflow: 'hidden' });
        } else { //iOSBodyStyle
            Object.assign(document.body.style, { WebkitOverflowScrolling: 'none', overflow: 'hidden' } );
        }

        // const mapY = document.getElementById('LeafletMiyawaki')
        // window.scrollTo({
        //     top: mapY?.offsetTop || 0,
        //     left: 0,
        //     behavior: 'smooth'
        // });
    }
    function unlockMap() {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        if (!/iP(ad|hone|od)/.test(navigator.userAgent)) {
            Object.assign(document.body.style, { overflow: 'auto' });
        } else { //iOSBodyStyle
            Object.assign(document.body.style, { WebkitOverflowScrolling: 'touch', overflow: 'auto' });
        }
    }

    return (
        <div className={`${styles.ModalContainer} ${data && styles.active}`}>
            <div className={styles.closeArea} onClick={() => setModalContent(false)}></div>
            <div className={styles.modalContent}>
                <Button label="x" variant="singleCharClose" style={{ float: 'right' }} className={['']} onClick={() => setModalContent(false)} />
                <h1 className={styles.municipality}>{`${data.municipality ? `${data.municipality}: ` : ''}`}</h1>
                <div className={styles.listContent}>
                <ul>
                    {data.groups?.map && data.groups.map((g: TGNFG) => {
                        const links = JSON.parse(g.links)
                        return (
                            <li key={g.groupid} className={`${styles[g.grouptype]}`}>
                                <div className={styles.icon}>
                                    <SvgIcon width={`2.5em`} {...{ id: logo.id }} />
                                </div>
                                {/* <img className={styles.logo} src={logo.url.replace("%PUBLIC_URL%", process.env.PUBLIC_URL)} alt="logo" /> */}
                                {/* {POPUP FORCES STRING - NO ONCLICK} UGLY HREF*/}
                                {/* {<a href={`${window.location.pathname}#/group/${g.id}`}>
                <Button label={g.navn}/>
              </a>} */}
                                <span className={`${styles.groupName} `}>{g.name}</span>
                                <div className={styles.icons}>
                                    {links.map((l: TLink, i: number) =>
                                        <a key={i} href={`${l.url}`} rel="noreferrer" target="_blank">
                                            <SvgIcon width={`2.5em`} {...{ id: l.name || 'linkicon  ' }} />
                                        </a>
                                    )}

                                </div>
                            </li>
                        )
                    })}
                    <li className={styles.join}>
                        <h1>+</h1>
                        <span>{t('group.join')}</span>
                        <div className={styles.icons}>
                            <a href={`mailto:${config.contact.email}`} rel="noreferrer" target="_blank">
                                <SvgIcon width={`2.5em`}{...{ id: 'email' }} />
                            </a>
                            <a href={config.contact.facebook} rel="noreferrer" target="_blank">
                                <SvgIcon width={`2.5em`} {...{ id: 'facebook' }} />
                            </a>
                        </div>

                    </li>
                </ul>
                <div className={styles.joinText}>
                        {t('group.contactUs')}: <br />
                        <a href={`mailto:${config.contact.email}`}>info@omstilling.nu</a><br />
                        {t('w.or')}<br />
                        <a target="_blank" rel="noreferrer" href={`${config.contact.facebook}`}>www.facebook.com/groennenabofaellesskaber</a><br />
                </div>
                </div>
            </div>
        </div>
    )
}

export default ModalContainer