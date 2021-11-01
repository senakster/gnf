import React from 'react'
import styles from '../LeafletCompMiyawaki.module.scss'
import { logo } from '_libs/_media/img/images.json'
import SvgIcon from 'components/ui/SvgIcon/SvgIcon';
import config from '_libs/_config/config.json'
import { useTranslation } from 'react-i18next';

const PopContent: React.FC<any> = ({ groups, name}) => {
    const { t } = useTranslation('map');
    return (
        <div className={styles.popup}>
            <h2 className={styles.municipality}>{`${name}:`}</h2>
            <ul>
                {groups.map((g: TGNFG) => {
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
                    <span>{t('popup.join')}</span>
                    <div className={styles.icons}>
                        <a href={`mailto:${config.contact.email}`} rel="noreferrer" target="_blank">
                            <SvgIcon width={`2.5em`}{...{ id: 'email' }} />
                        </a>
                        <a href={config.contact.facebook} rel="noreferrer" target="_blank">
                            <SvgIcon width={`2.5em`} {...{ id: 'facebook' }} />
                        </a>
                    </div>

                </li>
                <div className={styles.joinText}>
                    {t('popup.contactUs')}: <br />
                    <a href={`mailto:${config.contact.email}`}>info@omstilling.nu</a><br />
                    {t('w.or')}<br />
                    <a target="_blank" rel="noreferrer" href={`${config.contact.facebook}`}>www.facebook.com/groennenabofaellesskaber</a><br />
                </div>
            </ul>

        </div>)
}

export default PopContent