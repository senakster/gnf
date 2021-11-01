import React from 'react';
import styles from './CookieSettings.module.scss';
import settings from './cookies'
import Button from 'components/ui/Button/Button';
import Cookies from 'universal-cookie';
import { useTranslation } from 'react-i18next';
import { capitalize } from '_libs/_helpers/fn';
import { history } from '_libs/_helpers/history'
import { google } from '_libs/_config/config.json'
import fn from './fn';
import { ActionType, useStateContext } from '_libs/_state';

type TCookieOption = {
  category: string;
  accept: boolean;
}

const CookieSettings: React.FC<any> = ({ variant, active }) => {
  const { t } = useTranslation('cookies');
  const { dispatch } = useStateContext();
  // const cookie = new Cookies().get('cookieConsent');
  const initialState = !new Cookies().get('cookieConsent') && !localStorage.getItem('cookieConsent')
  const [ui, setUI] = React.useState({
    active: typeof active === 'boolean' ? active : initialState,
  });
  
  
  const [cookieOptions, setCookieOptions] = React.useState(
    // new Cookies().get('cookieConsent') 
    // ? [...JSON.parse(decodeURIComponent(new Cookies().get('cookieConsent')).split(';')[0])] :
      [
        ...settings.cookies
          .filter((s) => s.declarations.length > 0)
          .map((s) => { return { category: s.category, accept: s.defaultvalue } as TCookieOption }),
      ]
      );

  function toggleActive() {
    setUI({
      active: !ui.active,
    })
  }

  function googleUpdateConsent() {
    const consent = cookieOptions.find((c: { category: string, accept: boolean }) => c.category === 'Statistics')?.accept
    const cookies = new Cookies()
    !consent && cookies.get(`_ga_${google.gtag}`) && cookies.remove(`_ga_${google.gtag}`)
    !consent && cookies.get('_ga') && cookies.remove('_ga')
    fn.googleAnalyticsConsent(consent)
  }

  function handleWindowClick(e: any) {
    const {target, type} = e
    cookieOptions.find((c)=>c.category === "Statistics")?.accept && type === 'click' && target.closest('a')?.href &&
    fn.gtagEvent(`follow link`, `${history.location.pathname} => ${target.closest('a').href}`)
  }

  React.useEffect(() => {
      const listener = history.listen(location => {
        fn.gtagPageView(location.pathname)
      });
      document.addEventListener('click', handleWindowClick);

      try {
        // const co = decodeURIComponent(new Cookies().get('cookieConsent')).split(';')[0]
        const co = localStorage.getItem('cookieConsent')
        if (co) {
          setCookieOptions([...JSON.parse(co)]);
        };
        // setCookieOptions([...co]);
      } catch (e: any) {

      }
    return () => {
      listener()
      document.removeEventListener('click', handleWindowClick);
    }
  },[])

  React.useEffect(() => {
    const cookies = new Cookies();
    const expires = new Date();
    expires.setMonth(expires.getMonth() + 1);
    const value = `${JSON.stringify(cookieOptions)}`;
    
    const c = `${encodeURIComponent(value)};expires=${expires};path=${window.location.origin}/`
    // cookies.set('cookieConsent', encodeURIComponent(value), { path: `${window.location.origin}/`, expires });
    // console.log(value);
      // document.cookie = `cookieConsent=${c}`;
      localStorage.setItem('cookieConsent', value);
      googleUpdateConsent()
  }, [cookieOptions])

  React.useEffect(() => {
    const cookies = new Cookies();
    const setCookies = cookies.getAll();
    for (let k in setCookies) {
        settings.cookies.forEach((category) => {
        const declaration = category.declarations.find((cookie) => cookie.Name === k)
        declaration && category.category !== "Strictly Necessary" &&
        !cookieOptions.find((o) => o.category === category.category )?.accept &&
        cookieOptions.find((o) => o.category === category.category) && //only handlescookies from this cookieConsent
        cookies.remove(k);
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleInputChange(e: any) {
    const { name, checked } = e.target;
    setCookieOptions([
      ...cookieOptions
        .filter((o) => o.category !== name),
      { category: name, accept: checked },
    ])
  }

  function setSelection(defaultvalue: boolean) {
    setCookieOptions([
      ...cookieOptions
        .map((o) => {
          return {
            ...o,
            accept: settings.cookies
              .find((c) => c.category === o.category)?.optional ? defaultvalue : settings.cookies.find((c) => c.category === o.category)?.defaultvalue || false,
          }
        }),
    ])
  }
  function rejectAll(): void {
    setSelection(false)
    setUI({
      active: false,
    })
  }
  function acceptAll(): void {
    setSelection(true)
    setUI({
      active: false,
    })
    // reload();
  }
  function acceptSelected(): void {
    setUI({
      active: false,
    })
    // reload();
  }

  // function logMessage(title: string, message: string) {
  //   dispatch && dispatch({
  //     type: ActionType.NEW_MESSAGE,
  //     payload: {
  //       title: title,
  //       body: message,
  //     }
  //   })
  // }

  // function reload() {
  //   window.location.reload();
  // }

  // function clearCookies() {
  //   new Cookies().remove('cookieConsent');
  //   new Cookies().remove('_ga');
  //   new Cookies().remove(`_ga_${google.gtag}`);
  //   // const c = cookieOptions
  //   // logMessage('clear cookies', JSON.stringify(new Cookies().getAll()))
  //   // console.log(c, JSON.parse(decodeURIComponent(new Cookies().get('cookieConsent')).split(';')[0]))
  //   // logMessage('cookieOptions', new Cookies().get('cookieConsent'))
  // }
  return (
    <>
    {!ui.active &&
    [
        <Button key="0" className={['rounded', '']} label={t('Cookie Settings')} onClick={toggleActive}/>,
        // <Button key="1" className={['rounded', '']} label={t('Clear Cookies')} onClick={clearCookies}/>
    ]
    }
    <div className={`${styles.CookieSettings} ${styles[variant]} ${ui.active ? styles.active : styles.inactive}`}>
      <div className={styles.closeArea} onClick={toggleActive}></div>
      <div className={`${styles.container} container`}>
        <div className={`${styles.content}`}>
          <h3>{t("title")}</h3>
            <p>{t("subtitle")}{/*You can read more about our Cookie Policy in our <a href="privacy">Privacy policy<a/> */}</p>
          <ul className={styles.cookieList}>
            {settings.cookies
              .filter((c) => c.declarations.length > 0)
              .map((s, i) =>
                <li key={i}>
                  <label>{t(s.category)}</label>
                  <input
                    type="checkbox"
                    disabled={!s.optional}
                    checked={cookieOptions.find((c) => c.category === s.category)?.accept || false}
                    name={s.category}
                    onChange={handleInputChange}
                  />
                </li>)}
          </ul>
          <div className={styles.consentAction}>
            <Button label={t("Accept Selection")} className={`${styles.consentBtn}`} onClick={acceptSelected} />
              <Button label={t("Reject All" )}className={`${styles.consentBtn}`} onClick={rejectAll} />
              <Button label={t("Accept All")} className={`${styles.consentBtn}`} onClick={acceptAll} />
          </div>
          <CookieInformation />
        </div>
      </div>
    </div>
    </>
  );
}

export default CookieSettings;

const CookieInformation: React.FC<any> = () => {
  const { t } = useTranslation('cookies');

  const init = settings.cookies.filter((c) => c.declarations.length > 0).map((c) => c.category)[0];
  const [ui, setUI] = React.useState({
    active: '',
    category: init || '',
  })


  function toggleActive(e: any) {
    const { name } = e.target
    setUI({
      ...ui,
      active: name === ui.active ? '' : name,
    })
  }

  function toggleCategory(e: any) {
    const { name } = e.target
    setUI({
      ...ui,
      category: name,
    })
  }
  return (
    <div className={styles.CookieInformation}>
      <div className={styles.infoTab}>
        <Button className={[`${ui.active === 'info' && 'active'}`]} label={t("Cookie Declaration")} name="info" onClick={toggleActive} />
        <Button className={[`${ui.active === 'about' && 'active'}`]} label={t("About Cookies")} name="about" onClick={toggleActive} />
      </div>
      <div className={styles.infoContainer}>
        <div className={`${styles.infoContent} ${ui.active === 'info' && styles.active}`}>
          <div className={styles.closeBtn}>
            <Button className={['fixed','singleCharClose']} name="info" label={"x"} onClick={toggleActive} />
          </div>
          <div className={styles.catBtnContainer}>
            {settings.cookies
              .filter((c) => c.declarations.length > 0)
              .map((c, i) =>
                <Button key={i}
                name={c.category}
                className={[`${ui.category === c.category && 'active'}`]}
                variant={'small'}
                label={t(c.category)}
                onClick={toggleCategory} />
              )}
            {/* <Button variant={'small'} label="TARGETING"/>
            <Button variant={'small'} label="FUNCTIONALITY" />
            <Button variant={'small'} label="UNCLASSIFIED" /> */}
          </div>
          <CookieInfoBox category={ui.category} />
        </div>
        <div className={`${styles.infoContent} ${ui.active === 'about' && styles.active}`} >
          <div className={styles.closeBtn}>
            <Button className={['fixed','singleCharClose']} name="about" label={"x"}/*"&#x21B6;"*/ onClick={toggleActive} />
          </div>
          <p>{t('cookie-about')}</p>
        </div>
      </div>
    </div>
  )
}

const CookieInfoBox: React.FC<any> = ({ category }) => {
  const {t} = useTranslation(['cookies','time'])
  return (
    <div className={styles.cookieInfoBox}>
      <h2 className={styles.catTitle}>{category && `${t(category)} ${t("w.cookies")}`}</h2>
      <span className={styles.declarationText}>{t(`cookie-declarations.${category}`, '')}</span>
      {settings.cookies.find((c) => c.category === category)?.declarations
        .map((c, i) =>
            <ul key={i} className={styles.cookieProps}>
            <li><span>{capitalize(t("w.name"))}:</span> {c.Name}</li>
            <li><span>{capitalize(t("w.domain"))}:</span> {c.Domain}</li>
            <li><span>{capitalize(t("w.expiration"))}:</span> {t(`time:${c.Expiration.key}`, { count: c.Expiration.count, defaultValue: c.Expiration.fallback })}</li>
            <li><span>{capitalize(t("w.description"))}:</span> {t(`cookie-descriptions.${c.Name}`, {defaultValue: c.Description})}</li>
            </ul>
        )
      }
    </div>
  )
}