import React from 'react';
export function loadComponent(scope, module = './default') {
  return async () => {
    // Initializes the share scope. This fills it with known provided modules from this build and all remotes
    await __webpack_init_sharing__('default');

    const container = window[scope]; // or get the container somewhere else
    // Initialize the container, it may provide shared modules
    if (!container) {
      return {
        default: undefined,
      };
    }
    try {
      await container.init(__webpack_share_scopes__.default);
      const factory = await container.get(module);
      const Module = factory();
      return Module;
    } catch (error) {
      console.error(error);
    }
  };
}

export const useDynamicScript = (args) => {
  const [ready, setReady] = React.useState(false);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    if (!args.url) {
      return;
    }

    const element = document.createElement('script');

    element.src = args.url;
    element.type = 'text/javascript';
    element.async = true;

    setReady(false);
    setFailed(false);

    element.onload = () => {
      console.log(`Dynamic Script Loaded: ${args.url}`);
      setReady(true);
    };

    element.onerror = () => {
      console.error(`Dynamic Script Error: ${args.url}`);
      setReady(false);
      setFailed(true);
    };

    document.head.appendChild(element);

    return () => {
      console.log(`Dynamic Script Removed: ${args.url}`);
      document.head.removeChild(element);
    };
  }, [args.url]);

  return {
    ready,
    failed,
  };
};

const loadScript = (src) => {
  let isLoaded = false;

  for (let elem of document.head.children) {
    if (elem.matches(`script[src="${src}"]`)) {
      isLoaded = true;
      return Promise.resolve();
    }
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = resolve;
    script.onerror = reject;
    script.src = src;
    document.head.append(script);
  });
};

export const loadRemoteLib = async (props) => {
  const { url, module, scope } = props;
  await loadScript(url);
  const loadModule = loadComponent(scope, module);

  const remoteModule = await loadModule();

  return remoteModule;
};
