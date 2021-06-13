import _ from 'lodash';

export const isFirstLetterIsUpper = (word) => {
  return word.charCodeAt(0) >= 65 && word.charCodeAt(0) <= 90;
};

export const componentLibs = (components) =>
  Object.keys(components)
    .filter((name) => isFirstLetterIsUpper(name))
    .map(
      (name) =>
        `const ${name} = ({ children }) => <${components[name]}> {children} </${components[name]}> ;\n`,
    )
    .join('');

export const importLibs = (imports) =>
  imports
    .map((item) =>
      _.isArray(item) ? `import ${item[0]} from '${item[1]}'; ` : `import * from '${item}';`,
    )
    .join('\n');

export const bindScopeEnv = function (scope, context) {
  return (code, props = {}) => {
    const combinedScope = { ...props, ...scope };
    const sandbox = new Function(Object.keys(combinedScope).join(','), `return ${code}`);
    const scopedSandbox = sandbox.apply(context, Object.values(combinedScope));
    return scopedSandbox && scopedSandbox.bind ? scopedSandbox.bind(context) : scopedSandbox;
  };
};
