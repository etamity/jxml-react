import React, { useState, useCallback, useEffect } from 'react';
import * as ReactRedux from 'react-redux';
import JXContext from './JXContext';
import { bindScopeEnv } from './libs/utils';
import JXRender from './JXRender';
import * as JXComponent from './Components';
import produce from 'immer';
import { useDispatch } from 'react-redux';
import ErrorBoundary from './components/ErrorBoundary';
import _ from 'lodash';
import { loadRemoteLib } from './libs';

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

    setModules({ ...modulesMap, ...modulesMap.Default });
  } else {
    setModules({});
  }
}

const JXProvider = ({ context, children, ...props }) => {
  if (!children) {
    return null;
  }
  const jx = children;
  const { onMount, onUnMount, remote } = jx;
  const { components, scope, thisContext } = context || {};
  const [state, _setState] = useState(jx.state);
  const [modules, setModules] = useState(null);
  const dispatch = useDispatch();
  const setState = useCallback(
    (newState) => {
      _setState(produce(newState));
    },
    [_setState],
  );

  const EnvScope = {
    ...scope,
    ...components,
    JXComponent,
    ...modules,
    React,
    ReactRedux,
  };

  const EnvContent = {
    ...thisContext,
    setState,
    dispatch,
    state,
    local: new Map(),
    props: {
      ...jx.props,
      ...props,
    },
  };
  const bindScript = bindScopeEnv(EnvScope, EnvContent);

  useEffect(() => {
    console.log(modules, remote);
    fetchModules(remote, setModules);
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
  }, [onMount, onUnMount, remote, jx.state]);

  try {
    return (
      <ErrorBoundary>
        <JXContext.Provider
          value={{
            bindScript,
            EnvScope,
          }}
        >
          {modules && <JXRender json={jx} />}
        </JXContext.Provider>
      </ErrorBoundary>
    );
  } catch (error) {
    console.error(error);
  }
};

export default JXProvider;
