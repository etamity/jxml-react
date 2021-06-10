import React from 'react';
import AppContainer from './AppContainer';
import AppContext from './AppContext';
import { renderRoutes } from './libs/renderRoutes';
import { loadModels } from './Store';
import * as serviceWorker from './utils/serviceWorker';

export default ({ context }) => {
  const { models, routes } = context || {};
  models && loadModels(models);
  return (
    <AppContext.Provider value={context}>
      <AppContainer>{routes && renderRoutes(routes)}</AppContainer>
    </AppContext.Provider>
  );
};

serviceWorker.unregister();
