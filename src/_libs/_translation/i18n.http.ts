import i18n from 'i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import backendOptions from './i18n.backend.config'
// import { reactI18nextModule } from "react-i18next"; //https://react.i18next.com/latest/using-with-hooks
// import { initReactI18next } from 'react-i18next';
import HttpApi from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import fn from './fn'
// don't want to use this?
// have a look at the Quick start guide 
// for passing in lng and translations on init
// const translationsUrl = '',
i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
    // learn more: https://github.com/i18next/i18next-http-backend
    .use(HttpApi)       
    // detect user language
    // learn more: https://github.com/i18next/i18next-browser-languageDetector
    .use(LanguageDetector)
    // pass the i18n instance to react-i18next.
    // .use(reactI18nextModule as Module)
    // init i18next
    // for all options read: https://www.i18next.com/overview/configuration-options
    .init({
        backend: {
            			// for all available options read the backend's repository readme file
            loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json?lng={{lng}}&{{ns}}`,
            // crossDomain: true
        },
        fallbackLng: 'da',
        debug: false,
        interpolation: {
            escapeValue: false, // not needed for react as it escapes by default    
            // format: fn.format,
        },

        react: {
            bindI18n: 'languageChanged',
            bindI18nStore: '',
            transEmptyNodeValue: '',
            transSupportBasicHtmlNodes: true,
            transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
            useSuspense: true,
        },
        
    });


export default i18n;