import React from 'react';
import _ from 'lodash';
import htmltags from './libs/htmltags';

const getType = (type, components) => _.get(components, type) || htmltags(type);

export function renderAst(json, context) {
  if (_.isPlainObject(json)) {
    const { EnvScope } = context;
    const type = getType(json.component, EnvScope);

    const children = _.isArray(json.props.children)
      ? json.props.children.map((child) => renderAst(child, context))
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

export default renderAst;
