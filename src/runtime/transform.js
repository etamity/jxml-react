import _ from 'lodash';
import { isFirstLetterIsUpper } from './libs/utils';

export const transformPropValueStr = ({ propName, value, context }) => {
  try {
    if (propName === 'style' && !_.isPlainObject(value)) {
      return undefined;
    } else if (_.isString(value)) {
      const { bindScript, ownProps } = context;
      if ([value.indexOf('::') > -1].some(Boolean)) {
        const [valueRef] = value.split('::').reverse();
        return bindScript(valueRef, { props: ownProps });
      } else if ([/^\S*\bon[A-Z]\w+/.test(propName)].every(Boolean)) {
        return bindScript(value);
      } else if ([/\$\{(\'|\")?\w.+\}(\'|\")?/.test(value)].every(Boolean)) {
        return bindScript(`\`${value}\``);
      } else if ([/^\S*\bthis.\b(state\.|props\.)\w.\S+\S$/.test(value)].some(Boolean)) {
        return bindScript(value) || value;
      } else {
        return bindScript(`\`${value}\``);
      }
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
        [name]: transformPropValueStr({ propName: name, value: json[name], context }),
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
        return transform({ json: obj, tagName: name, context });
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
  const children = getChildren({ json, context });
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
