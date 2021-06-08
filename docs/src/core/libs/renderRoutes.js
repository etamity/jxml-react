import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Skeleton from '../components/Skeleton';

function isPromise(promise) {
  return !!promise && typeof promise.then === 'function';
}

export function renderRoutes(routes, extraProps = {}, switchProps = {}) {
  return routes && routes.length ? (
    <Switch {...switchProps}>
      {routes.map((route, i) => (
        <Route
          key={route.key || i}
          path={route.path}
          exact={route.exact}
          strict={route.strict}
          render={(props) => {
            const DynamicComponent = isPromise(route.component)
              ? lazy(() => route.component)
              : route.component;
            return route.redirect ? (
              <Redirect {...route} from={route.path} to={route.redirect} />
            ) : route.render ? (
              route.render({ ...props, ...extraProps, route: route })
            ) : (
              <React.Suspense
                fallback={
                  <div
                    style={{
                      background: '#fafafa',
                      padding: 24,
                    }}
                  >
                    <Skeleton />
                  </div>
                }
              >
                <DynamicComponent {...props} {...extraProps} route={route}>
                  {renderRoutes(route.routes, props)}
                </DynamicComponent>
              </React.Suspense>
            );
          }}
        />
      ))}
      <Route path="/">
        <Redirect from="/" to={routes[0].path} />
      </Route>
    </Switch>
  ) : null;
}
