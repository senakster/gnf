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
import Storage from 'components/global/Storage/Storage';

// UI
import Header from 'components/ui/Header/Header.lazy';

//CARDS
import CardGenerator from 'components/views/CardGenerator/CardGenerator';


// STATE
// import { AxiosResponse } from 'axios';
// import CookieSettings from 'components/global/CookieSettings/CookieSettings';

export function QRApp() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
                        logo, title
                    ]}
                />
                <CardGenerator />
            </ThemeProvider>
        </div>
        // </StateProvider>
    );
}
