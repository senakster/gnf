import React from 'react';
import SvgIcon from 'components/ui/SvgIcon/SvgIcon';
import styles from './LanguageSelector.module.scss';
import { useTranslation } from 'react-i18next';
import Button from 'components/ui/Button/Button';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation()
  const langs = [
    { lc: 'da', name: 'Dansk' }, 
    { lc: 'en', name: 'English' }
  ];

  const [state, setState] = React.useState({
    active: false,
    lng: i18n.language || 'da',
  });

  React.useEffect(() => {
    setState({
      ...state,
      lng: i18n.language,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[i18n.language])

  function changeLang(e: any) {
    const { value } = e.target;

    i18n.changeLanguage(value)
  }
  return (
    <div className={styles.LanguageSelector} data-testid="LanguageSelector">
      <div className={styles.currentLng}>
      <SvgIcon {...{ id: 'globe',width: '1em'}} /><span> {state.lng}</span>
      </div>
      <div className={styles.options}>
        <ul>
        {langs.map((l) => 
          <li key={l.lc}>
            <Button label={l.name} value={l.lc} onClick={changeLang} />
          </li>
        )}
        </ul>
      </div>
    </div>
  );
}

export default LanguageSelector;
