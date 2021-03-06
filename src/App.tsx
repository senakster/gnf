import React from 'react';
import './App.scss';


// THEMES
import { GlobalStyles, themes } from '_libs/_themes';
import { ThemeProvider } from 'styled-components';

// THEME TESTING
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import ff from '_libs/_fonts'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Themes from 'components/global/Themes/Themes';

// MEDIA
import { have, title, logo } from '_libs/_media/img/images.json'


// COMPONENTS
//REMOTE
//import RHeader from 'host/Header'
//GLOBAL
import ErrorBoundary from 'components/global/ErrorBoundary/ErrorBoundary';
import Router from 'components/global/Router/Router';
import Storage from 'components/global/Storage/Storage';
import Messages from 'components/global/Messages/Messages';
import Modal from 'components/global/Modal/Modal.lazy';

// UI
import Header from 'components/ui/Header/Header.lazy';
import Footer from 'components/ui/Footer/Footer.lazy';

//CARDS
import Map from 'components/views/Map/Map';
import CardGenerator from 'components/views/CardGenerator/CardGenerator';


// STATE
import { ActionType, useStateContext } from '_libs/_state';
import { getGnfGrupper, getGnfGrupperREST } from '_libs/_data'
// import { AxiosResponse } from 'axios';
// import CookieSettings from 'components/global/CookieSettings/CookieSettings';

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [theme, setTheme] = React.useState(themes.find((t) => t.id === 4)?.name || 'gnf');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [font, setFont] = React.useState('Dosis');
  const { dispatch } = useStateContext()
  const { data } = useStateContext().state.state

  function logMessage(title: string, message: string) {
    dispatch && dispatch({
      type: ActionType.NEW_MESSAGE,
      payload: {
        title: title,
        body: message,
      }
    })
  }

  React.useEffect(() => {
    /** 
     * APP INITIATION
    */
    const Init_App = async () => {
      (data.updated < new Date().getTime() - 86400000 || data.grupper.length < 1 || true) ?
        getGnfGrupperREST()
          .then((r) => {
            console.log(r)
            try {
              if (r.data === undefined) {
                throw new Error(JSON.stringify(r));
              }
              r.data && dispatch && dispatch({
                type: ActionType.SET_DATA,
                payload: { grupper: [...r.data] }
              })
            } catch (e: any) {
              logMessage('Error', e.message)
            }
          }
          )
        :
        clearInterval(interval)
      // console.log('App Initiation', updated)
      // console.log(state.state.data.updated, new Date().getTime() - 86400000)

    }
    Init_App()
    const interval = setInterval(Init_App, 10000);
    return () => { clearInterval(interval) }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleThemeChange(event: any) {
    const target = event.target;
    const theme = themes.find((t) => t.id === parseInt(target.value));
    theme && setTheme(theme.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function handleFontChange(event: any) {
    const target = event.target;
    setFont(target.value);
  }

  return (
    <div className="App" style={{ '--ff': `'${font}'` } as React.CSSProperties}>
      <Storage />
      <ThemeProvider theme={themes.find((t) => t.name === theme)?.theme} >
        <GlobalStyles />
        <Header navigation="true"
          // title={title}
          // variant={`fat`}
          backgroundImage={have}
          logo={[
            logo, title
          ]}
        />
        {/* <CookieSettings variant="modal" /> */}

        {/* <Themes variant="minimal" theme={theme} font={font} handlers={{handleThemeChange, handleFontChange}} /> */}
        <ErrorBoundary>
          <Router />
        </ErrorBoundary>
        <ErrorBoundary>
          <Footer variant={'collapse'} />
        </ErrorBoundary>
      </ThemeProvider>
      <Messages />
      <Modal />
    </div>
  );
}

export default App;