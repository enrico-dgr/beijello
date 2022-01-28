import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n';
import Routing from './Routing';
import { BrowserRouter } from 'react-router-dom';


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
