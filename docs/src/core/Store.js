import { init } from '@rematch/core';
import LoadingPlugin from '@rematch/loading';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

function configureStore(models = {}) {
  const reducers = { router: connectRouter(history) };
  const store = init({
    name: 'DashpadX Store',
    models,
    redux: {
      reducers,
      middlewares: [routerMiddleware(history)],
      devtoolOptions: {},
    },
    plugins: [LoadingPlugin()],
  });

  return store;
}

export const store = configureStore();

export const loadModels = (models) => {
  Object.keys(models).forEach((modelKey) => {
    console.log(`Reloading model ${modelKey}`);
    store.addModel({
      name: modelKey,
      ...models[modelKey],
    });
  });
};

// if (module.hot) {
//   // Enable Webpack hot module replacement for reducers
//   module.hot.accept(['./models'], () => {
//     loadModels({});
//   });
// }

export default configureStore;
