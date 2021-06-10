import React from 'react';
import { Redirect } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

const loadModules = (contexts) =>
  contexts.reduce((co, ctx) => {
    const keys = ctx.keys();
    const values = keys.map(ctx);
    const resovle = keys.map(ctx.resolve);
    const value = resovle.reduce((o, k, i) => {
      o[k] = values[i];
      return o;
    }, {});
    return { ...co, ...value };
  }, {});

export const generateRoutes = (collections = {}) => {
  let allRoutes = [];
  for (let [key, value] of Object.entries(collections)) {
    for (let [mkey, mvalue] of Object.entries(value)) {
      if (!!mvalue.default) {
        const { routes } = mvalue.default;
        allRoutes.push({
          routes: routes.map((route) => ({
            ...route,
            path: route.path ? route.path : mkey.substring(1, mkey.length),
            component: (props) => {
              const { route: subRoute } = props;
              const Component = route.component;
              return (
                <>
                  <Component {...props} />
                  {renderRoutes(subRoute.routes)}
                </>
              );
            },
          })),
        });
      }
    }
  }
  return [
    ...utils.generateRoutesFromConfigs(allRoutes, null),
    {
      path: '/',
      exact: true,
      component: () => <Redirect to="/" />,
    },
    {
      component: () => <Redirect to="/error-404-not-found" />,
    },
  ];
};

export default loadModules;
