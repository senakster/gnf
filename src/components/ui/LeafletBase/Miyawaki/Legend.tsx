import SvgIcon from "components/ui/SvgIcon/SvgIcon"
import { useTranslation } from "react-i18next"
import styles from "./Legend.module.scss"
import icons from "./icons"

const Legend: React.FC = () => {
    const {t} = useTranslation('Miyawaki')
    const iconSize = "30px";
    return (
        <div className={styles.Legend}>
            <ul>
                <li>
                    <SvgIcon {...{ id: 'trees', width: iconSize}} />
                    : {t('w.Miyawaki Forest')}
                </li>
                <li>
                    <SvgIcon {...{ id: 'seedling', width: iconSize}} />
                    : {t('w.Miyawaki Project')}
                </li>
                <li>
                    <SvgIcon {...{ id: 'leaf', width: iconSize}} />
                    : {t('w.Miyawaki Prospect')}
                </li>
            </ul>
        </div>
    )
}

export default Legend