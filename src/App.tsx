import React from 'react';
// import logo from './logo.svg';
import './App.scss';
import Router from 'components/global/Router/Router';
// import Messages from 'components/global/Messages/Messages';
import Header from 'components/ui/Header/Header';
import Themes from 'components/global/Themes/Themes';
import { GlobalStyles, themes } from '_themes';
import { ThemeProvider } from 'styled-components';
import { have } from '_data/images.json'
import SoMeData from '_data/some.json'
import Footer from 'components/ui/Footer/Footer';

function App() {
  const [theme, setTheme] = React.useState(themes.find((t) => t.id === 4)?.name || 'omstillingNu');

  function handleThemeChange(event: any) {
    const target = event.target;
    const theme = themes.find((t) => t.id === parseInt(target.value));
    theme && setTheme(theme.name);
  }

  const title = 'Grønne Nabofællesskaber'

  return (
    <div className="App">
      <ThemeProvider theme={themes.find((t) => t.name === theme)?.theme} >
      <GlobalStyles />
      <Header navigation="true" 
          // title={title}
          // variant={`fat`}
          backgroundImage={have}
          logo={[
            `${process.env.PUBLIC_URL}/logo/gnf-logo.svg`,
            `${process.env.PUBLIC_URL}/logo/gnf-text.svg`,
          ]}
          some={SoMeData}
        // variant={`scrollCollapse`}
      />

      {/* <Themes 
      variant="minimal" 
      theme={theme} handler={handleThemeChange} /> */}
      {/* <Messages /> */}
      <Router />
        <Footer {...SoMeData} variant={'someOnly'} />
      </ThemeProvider>
    </div>
  );
}

export default App;
