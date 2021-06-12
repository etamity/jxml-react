import React from 'react';
import _ from 'lodash';
import htmltags from './libs/htmltags';

const getType = (type, components) => _.get(components, type) || htmltags(type);

const ifLowerCase = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!#\*\?])(?=.{8,})/;

export function renderAst(json, EnvScope) {
  if (_.isPlainObject(json)) {
    const type = getType(json.component, EnvScope);

    const children = _.isArray(json.props.children)
      ? json.props.children.map((child) => renderAst(child, EnvScope))
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
