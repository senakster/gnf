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
import { title, logo } from '_libs/_media/img/images.json'


// COMPONENTS
//REMOTE
//import RHeader from 'host/Header'
//GLOBAL
import Modal from 'components/global/Modal/Modal.lazy';

// UI
import Header from 'components/ui/Header/Header.lazy';

//CARDS
import Map from 'components/views/Map/Map';


// STATE
import { ActionType, useStateContext } from '_libs/_state';
import { getGnfGrupper, getGnfGrupperREST } from '_libs/_data'
// import { AxiosResponse } from 'axios';
// import CookieSettings from 'components/global/CookieSettings/CookieSettings';

export function FullMap() {
    const { dispatch } = useStateContext()
    const { data } = useStateContext().state.state
    // React.useEffect(() => {
    //   /** 
    //    * APP INITIATION
    //   */

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
            (data.updated < new Date().getTime() - 86400000 || data.grupper.length < 1) ?
                // getGnfGrupper()
                //   .then((r) => {
                //     try {
                //       if (r?.data?.data === undefined) {
                //         throw new Error(JSON.stringify(r));
                //       }
                //       r?.data?.data && dispatch && dispatch({
                //         type: ActionType.SET_DATA,
                //         payload: { grupper: [...r.data.data] }
                //       })
                //     } catch (e: any) {
                //       logMessage('Error', e.message)
                //     }
                //   }
                //   )
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
    const [theme, setTheme] = React.useState(themes.find((t) => t.id === 4)?.name || 'gnf');

    return (
        // <StateProvider value={initialState}>
        <div className={`App embed`}>
            {/* <Storage /> */}
            <ThemeProvider theme={themes.find((t) => t.name === theme)?.theme} >
                <GlobalStyles />
                <Header
                    variant='embed'
                    // backgroundImage={have}
                    logo={[
                        logo, title
                    ]}
                />
                <Map variant="embed-logo" /*variant="embed" | variant="embed-logo"*/ />
                <Modal />
                {/* <CookieSettings variant="modal" /> */}
            </ThemeProvider>
        </div>
        // </StateProvider>
    );
}
