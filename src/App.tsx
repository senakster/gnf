import React from 'react';
import './App.scss';


// THEMES
import { GlobalStyles, themes } from '_themes';
import { ThemeProvider } from 'styled-components';

// THEME TESTING
import ff from '_fonts'
import Themes from 'components/global/Themes/Themes';

// MEDIA
import { have, sprites, title, logo } from '_media/img/images.json'


// COMPONENTS
  //GLOBAL
import ErrorBoundary from 'components/global/ErrorBoundary/ErrorBoundary';
import Router from 'components/global/Router/Router';
import Storage from 'components/global/Storage/Storage';
import Messages from 'components/global/Messages/Messages';
  // UI
import Header from 'components/ui/Header/Header';
import Footer from 'components/ui/Footer/Footer';

  //CARDS
import CardGenerator from 'components/views/CardGenerator/CardGenerator';


// STATE
import { ActionType, useStateContext } from '_state';
import { getGnfGrupper } from '_data'

const App: React.FC = () => {
  const [theme, setTheme] = React.useState(themes.find((t) => t.id === 4)?.name || 'gnf');
  const [font, setFont] = React.useState('Poppins');
  const { state, dispatch } = useStateContext()
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

    const Init_App = () => {
        (data.updated < new Date().getTime() - 86400000 || data.grupper.length < 1) ?
        getGnfGrupper()
        .then((r) => {
          try {
            // console.log(r)
            if (r?.data === undefined) {
              throw new Error(r.message);
            }
            console.log('Get Data')
            r?.data && dispatch && dispatch({
              type: ActionType.SET_DATA,
              payload: { ...r.data }
            })
          } catch (e) {
            console.error(e)
            logMessage('Error', e.message)
          }
        } 
        ) :
        clearInterval(interval)      
      // console.log('App Initiation', updated)
      // console.log(state.state.data.updated, new Date().getTime() - 86400000)

    }
    Init_App()
    const interval = setInterval(Init_App, 10000);
    return () => { clearInterval(interval) }
  },[data])

  function handleThemeChange(event: any) {
    const target = event.target;
    const theme = themes.find((t) => t.id === parseInt(target.value));
    theme && setTheme(theme.name);
  }

  function handleFontChange(event: any) {
    const target = event.target;
    setFont(target.value);
  }


  // const title = 'Grønne Nabofællesskaber'
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
          
        // variant={`scrollCollapse`}
      />
{/*   <Themes 
      variant="minimal" 
      theme={theme} 
      font={font}
      handlers={{handleThemeChange, handleFontChange}} /> */}
      {/* <Messages /> */}
      <ErrorBoundary>
          <Router />
      </ErrorBoundary>
        <Footer variant={'collapse'} />
      </ThemeProvider>
      <Messages 
      // {...messages} /* migrated to global store*/
      />
    </div>
  );
}

export default App;

export function QRApp() {
  const [theme, setTheme] = React.useState(themes.find((t) => t.id === 4)?.name || 'gnf');

  return (
      // <StateProvider value={initialState}>
    <div className="App">
      <Storage />
      <ThemeProvider theme={themes.find((t) => t.name === theme)?.theme} >
        <GlobalStyles />
        <Header 
          backgroundImage={have}
          logo={[
            `${process.env.PUBLIC_URL}/logo/gnf-logo.svg`,
            `${process.env.PUBLIC_URL}/logo/gnf-text.svg`,
          ]}
          // some={SoMeData}
        />
        <CardGenerator />
      </ThemeProvider>
    </div>
    // </StateProvider>
  );
}