import _ from 'lodash';
import { isFirstLetterIsUpper } from './libs/utils';
import { useJXContext } from './JXContext';

export const transformPropValueStr = (key, value) => {
  if (key === 'style' && !_.isPlainObject(value)) {
    return undefined;
  } else if (_.isString(value)) {
    try {
      const { bindScript } = useJXContext();
      if ([/on[A-Z]\w+/.test(key)].every(Boolean)) {
        return bindScript(value);
      } else if ([/\$\{(\'|\")?\w.+\}(\'|\")?/.test(value)].every(Boolean)) {
        return bindScript(`\`${value}\``);
      } else if ([/^\S*\bthis.\b(state\.|props\.)\w.\S+\S$/.test(value)].some(Boolean)) {
        return bindScript(value) || value;
      } else {
        return bindScript(`\`${value}\``);
      }
    } catch (error) {}
  } else {
    try {
      return value;
    } catch (error) {}
  }
};

export function getProps(json) {
  return Object.keys(json)
    .filter((name) => [!isFirstLetterIsUpper(name), name !== 'children'].every(Boolean))
    .reduce((props, name) => {
      return { ...props, [name]: transformPropValueStr(name, json[name]) };
    }, {});
}

export function getChildren(json) {
  return Object.keys(json)
    .filter((name) => [isFirstLetterIsUpper(name), name == 'children'].some(Boolean))
    .map((name) => {
      const obj = json[name];
      if (name === 'children') {
        if (_.isPlainObject(obj)) {
          return transform(obj, name);
        }
        return transformPropValueStr(name, obj);
      } else if (_.isPlainObject(obj)) {
        return transform(obj, name);
      } else {
        const children = transformPropValueStr(name, obj);
        const props = children || (_.isArray(children) && children.length > 0) ? { children } : {};
        return {
          component: name.split('_')[0],
          name,
          props,
        };
      }
    });
}

export function transform(json, tagName = '_') {
  const children = getChildren(json);
  const _props = getProps(json);
  const props =
    children.length > 0
      ? {
          ..._props,
          children,
        }
      : _props;
  return {
    component: tagName.split('_')[0],
    name: tagName,
    props,
  };
}
