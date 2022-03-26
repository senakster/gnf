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

// STATE
import { ActionType, useStateContext } from '_libs/_state';
import { getGnfGrupperREST } from '_libs/_data'
// import { AxiosResponse } from 'axios';
// import CookieSettings from 'components/global/CookieSettings/CookieSettings';

const App: React.FC = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [theme, setTheme] = React.useState(themes.find((t) => t.id === 4)?.name || 'gnf');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [font, setFont] = React.useState('Poppins');
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
        function getGroupsREST(){
            try {
                getGnfGrupperREST()
                    .then((r) => {
                        r.data.constructor === Array &&
                        dispatch && dispatch({
                            type: ActionType.SET_DATA,
                            payload: { grupper: [...r.data] }
                        })
                    });
                clearInterval(interval)
            } catch (e: any) {
                logMessage('Error', e.message)
            }
        }

        const Init_App = async () => {
            (data.updated < new Date().getTime() - 86400000 || data.grupper.length < 1) ?
            getGroupsREST()
            :
            clearInterval(interval);

            // console.log('App Initiation', updated)
            // console.log(state.state.data.updated, new Date().getTime() - 86400000)

        }
        const interval = setInterval(Init_App, 10000);
        Init_App()

        return () => { clearInterval(interval) }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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
                    backgroundImage={have}
                    logo={[
                        logo, title
                    ]}
                />
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