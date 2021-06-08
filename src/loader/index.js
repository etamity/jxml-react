const yaml = require('js-yaml');
const unsafe = require('js-yaml-js-types').all;
const schema = yaml.DEFAULT_SCHEMA.extend(unsafe);

module.exports = function jxLoader(src) {
  let result = undefined;
  try {
    const jx = yaml.load(src, { schema });
    result = `
    import { JXProvider } from 'jxml-react';
    export default ({ context, ...props }) => <JXProvider context={context} {...props} children={${JSON.stringify(
      jx,
    )}}/>
    `;

    return result;
  } catch (error) {
    console.error(error);
  }
};
