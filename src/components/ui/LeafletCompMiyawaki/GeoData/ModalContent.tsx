// import Button from 'components/ui/Button/Button'
import SvgIcon from 'components/ui/SvgIcon/SvgIcon'
import { logo } from '_libs/_media/img/images.json'
import config from '_libs/_config/config.json'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './ModalContent.module.scss'
// import { useMap } from 'react-leaflet'
const ModalContent: React.FC<any> = ({municipality, groups }) => {
    const { t } = useTranslation('map')

    React.useEffect(() => {
        // data ? lockMap() : unlockMap()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
            <div className={styles.ModalContent}>
                <h1 className={styles.municipality}>{`${municipality ? `${municipality}: ` : ''}`}</h1>
                <div className={styles.listContent}>
                <ul>
                    {groups?.map && groups.map((g: TGNFG) => {
                        const links = g._embedded?.grouplinks || []
                        return (
                            <li key={g.id} className={`${styles[g.grouptype]}`}>
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
    )
}

export default ModalContent