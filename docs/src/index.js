import React from 'react';
import { App } from './core';
import { render } from 'react-dom';
import * as models from './models';
import routes from './routes';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/index.css';

const rootEl = document.getElementById('root');
render(
  <App
    context={{
      routes,
      models,
    }}
  />,
  rootEl,
);
