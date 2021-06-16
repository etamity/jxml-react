import React, { useState, useCallback, useEffect } from 'react';
import * as ReactRedux from 'react-redux';
import JXContext from './JXContext';
import { bindScopeEnv } from './libs/utils';
import JXRender from './JXRender';
import * as JXComponent from './Components';
import produce from 'immer';
import ErrorBoundary from './components/ErrorBoundary';
import _ from 'lodash';
import { loadRemoteLib } from './libs';
import componentsParser from './plugins/template';
async function fetchModules(remote, setModules) {
  if (remote) {
    const modulesArr = await Promise.all(
      Object.keys(remote).map(async (item) => {
        const remoteLib = await loadRemoteLib(remote[item]);
        return {
          name: item,
          module: remoteLib.default,
        };
      }),
    );
    const modulesMap = modulesArr.reduce(
      (root, item) => ({
        ...root,
        [item.name]: item.module,
      }),
      {},
    );
    const { Default } = modulesMap;
    setModules({ ...modulesMap, ...Default });
  } else {
    setModules({});
  }
}
const isAllModuleLoaded = (remote, modules) =>
  _.isEqual(Object.keys(remote).sort(), Object.keys(modules).sort());

const MicroEvent = {
  emit: (event, data) => {
    const packed = { event, data };
    window.postMessage(packed, '*');
  },
  on: (event, callback) => {
    window.addEventListener('message', ({ data }) => {
      switch (data.event) {
        case event:
          callback && callback(data);
          break;
        default:
      }
    });
  },
};

const JXProvider = ({ jx, context, children, ...props }) => {
  if (!children) {
    return React.Fragment;
  }
  const { components, scope, thisContext, plugins = [] } = context || {};
  const [state, _setState] = useState(jx.state);
  const [modules, setModules] = useState(null);
  const setState = useCallback(
    (newState) => {
      _setState(produce(newState));
    },
    [_setState],
  );

  const defaultContext = {
    EnvScope: {
      ...scope,
      ...components,
      JXComponent,
      ...modules,
      React,
      ReactRedux,
      MicroEvent,
    },
    ThisContext: {
      ...thisContext,
      setState,
      state: { ...jx.state, ...state },
      props: {
        ...jx.props,
        ...props,
      },
    },
  };

  const templateComponents = jx.template
    ? componentsParser(jx.template, {
        ...defaultContext,
      })
    : {};

  const EnvScope = {
    ...defaultContext.EnvScope,
    ...templateComponents,
  };

  const ThisContext = {
    ...defaultContext.ThisContext,
  };
  const bindScript = bindScopeEnv(EnvScope, ThisContext);

  useEffect(() => {
    const { onMount, onUnMount, remote } = jx;
    if (!remote || !modules || !isAllModuleLoaded(remote, modules)) {
      fetchModules(remote, setModules);
    }
    _setState(jx.state);

    try {
      onMount && bindScript(onMount)();
    } catch (error) {
      console.error(error);
    }
    return () => {
      try {
        onUnMount && bindScript(onUnMount)();
      } catch (error) {
        console.error(error);
      }
    };
  }, [jx]);

  try {
    return (
      <ErrorBoundary>
        <JXContext.Provider
          value={{
            bindScript,
            ThisContext,
            EnvScope,
          }}
        >
          {modules && <JXRender render={jx.render} />}
        </JXContext.Provider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error(error);
  }
};

export default JXProvider;
