import _ from 'lodash';
import React from 'react';
import { useSelector } from 'react-redux';
import { useJXContext } from '../JXContext';
import { useDynamicScript, loadComponent } from '../libs';
import JXProvider from '../index';
import produce from 'immer';
const mergeProps = (child, props) => {
  return {
    ...child,
    props: {
      ...child.props,
      ...props,
    },
  };
};

const mergeChildrenProps = (children, props) => children.map((child) => mergeProps(child, props));

export const Connect = ({ children = [], onMapStore }) => {
  const props = useSelector(onMapStore);
  return children.map((child) => mergeProps(child, props));
};

export const Render = ({ children, onMapProps, onMount, onUnMount, ...ownProps }) => {
  const [props, setProps] = React.useState(ownProps);
  const context = {
    props,
    setProps: React.useCallback(
      (newState) => {
        setProps(produce(newState));
      },
      [setProps],
    ),
  };
  React.useEffect(() => {
    onMount && onMount(context);
    return () => {
      onUnMount && onUnMount(context);
    };
  }, []);

  const mapProps = onMapProps && onMapProps(context);
  const renderPropsArray = () => mapProps.map((props) => mergeChildrenProps(children, props));
  const renderProps = () => mergeChildrenProps(children, mapProps);
  return _.isArray(mapProps) ? renderPropsArray() : renderProps();
};

export const Pipe = ({ children, ...props }) => {
  const { bindScript } = useJXContext();
  const allChildren = _.flatten(children);
  return _.flow(
    allChildren.map((child) => {
      if (_.isString(child)) {
        return bindScript(child);
      } else if (_.isObjectLike(child)) {
        return (props) => mergeProps(child, props);
      }
    }),
  )(props);
};

export const RemoteApp = ({ url, module, scope, ...props }) => {
  const { ready, failed } = useDynamicScript({
    url: url,
  });

  if (!ready) {
    return <h2>Loading dynamic script: {url}</h2>;
  }

  if (failed) {
    return <h2>Failed to load dynamic script: {url}</h2>;
  }

  const Component = React.lazy(loadComponent(scope, module));

  return (
    <React.Suspense fallback="Loading MicroApp">
      <Component {...props} />
    </React.Suspense>
  );
};

export const JxmlView = ({ url, ...props }) => {
  const [jxml, setJxml] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      const response = await fetch(url);
      const jxmlText = await response.text();
      try {
        setJxml(jxmlText);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [url]);
  return <JXProvider children={jxml} {...props} />;
};
