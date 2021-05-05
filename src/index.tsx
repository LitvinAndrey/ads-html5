import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './app/app';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <BrowserRouter basename="/#">
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or 13pxsend to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
