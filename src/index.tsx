import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './_libs/_translation/i18n.http';
import App from './App';
// import Storage from 'components/global/Storage/Storage'
import reportWebVitals from './reportWebVitals';
import { initialState, StateProvider } from '_libs/_state';
import App2 from 'Apps/App';
import { QRApp } from 'Apps/QRApp';
import { FullMap } from 'Apps/Fullmap';

ReactDOM.render(
  <React.StrictMode>
    <StateProvider value={initialState}>
      {/**
       * Build Variant
       */}
       
      {/* <App2 /> */}
      <App />
      {/* <QRApp /> */}
      {/* <FullMap /> */}
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
