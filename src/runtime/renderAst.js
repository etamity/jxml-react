import React from 'react';
import _ from 'lodash';
import { useJXContext } from './JXContext';
import htmltags from './libs/htmltags';

const getType = (type, components) => _.get(components, type) || htmltags(type);

export function jsonToAst(json) {
  const { EnvScope } = useJXContext();
  if (_.isPlainObject(json)) {
    const type = getType(json.component, EnvScope);

    const children = _.isArray(json.props.children)
      ? json.props.children.map(jsonToAst)
      : json.props.children;
    const props = children
      ? {
          ...json.props,
          key: json.name,
          children,
        }
      : {
          ...json.props,
          key: json.name,
        };
    try {
      return React.createElement(type, props);
    } catch (error) {
      console.log(error);
    }
  } else {
    return json || React.Fragment;
  }
}

export default (json) => jsonToAst(json);
