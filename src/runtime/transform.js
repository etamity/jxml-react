import _ from 'lodash';
import { isFirstLetterIsUpper } from './libs/utils';

export const transformPropValueStr = ({ propName, value, context }) => {
  const { ThisContext, EnvScope, ownProps } = context;
  try {
    if (propName === 'style' && !_.isPlainObject(value)) {
      return undefined;
    } else if (_.isFunction(value)) {
      return value(EnvScope, { ...ThisContext, ownProps });
    } else {
      return value;
    }
  } catch (error) {
    console.log(error);
  }
};
export function getProps({ json, context }) {
  return Object.keys(json)
    .filter((name) => [!isFirstLetterIsUpper(name), name !== 'children'].every(Boolean))
    .reduce((props, name) => {
      return {
        ...props,
        [name]: transformPropValueStr({
          propName: name,
          value: json[name],
          context: {
            ...context,
            ownProps: {
              ...context.ownProps,
              ...props,
            },
          },
        }),
      };
    }, {});
}

export function getChildren({ json, context }) {
  return Object.keys(json)
    .filter((name) => [isFirstLetterIsUpper(name), name == 'children'].some(Boolean))
    .map((name) => {
      const obj = json[name];
      if (name === 'children') {
        if (_.isPlainObject(obj)) {
          return transform({ json: obj, tagName: name, context });
        }
        return transformPropValueStr({ propName: name, value: obj, context });
      } else if (_.isPlainObject(obj)) {
        return transform({
          json: obj,
          tagName: name,
          context,
        });
      } else {
        const children = transformPropValueStr({ propName: name, value: obj, context });
        const [componentType, componentName] = name.split('_');
        const props = children || (_.isArray(children) && children.length > 0) ? { children } : {};

        return {
          component: componentType,
          name,
          props,
        };
      }
    });
}

export function transform({ json, tagName = '_', context }) {
  const _props = getProps({ json, context });
  const children = getChildren({
    json,
    context,
  });
  const [componentType, componentName] = tagName.split('_');
  const props =
    children.length > 0
      ? {
          ..._props,
          children,
        }
      : { ..._props };
  return {
    component: componentType,
    name: tagName,
    props,
  };
}
